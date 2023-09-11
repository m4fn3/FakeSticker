import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {Constants, React, Toasts} from 'enmity/metro/common'
import {create} from 'enmity/patcher'
import {bulk, filters, getByProps} from "enmity/metro"
import {getIDByName} from "enmity/api/assets"
// @ts-ignore
import manifest, {name as plugin_name} from '../manifest.json'
import Settings from "./components/Settings"

const Patcher = create('FakeSticker')

const [
    PermStat2,
    StickerStore,
    ChannelStore,
    MessageStore,
    Permissions
] = bulk(
    filters.byProps("isSendableSticker"),
    filters.byProps("getPremiumPacks", "getAllGuildStickers", "getStickerById"),
    filters.byProps("getChannel"),
    filters.byProps("sendMessage", "sendStickers"),
    filters.byProps('getChannelPermissions'),
)

const PermStat = getByProps("canUseStickersEverywhere", {defaultExport: false});

const LoadingIcon = getIDByName('ic_clock')
const FailIcon = getIDByName('Small')

const FakeSticker: Plugin = {
    ...manifest,
    onStart() {
        async function sendApngSticker(stickerId, channelId) {
            Toasts.open({
                content: "Processing A Sticker...",
                source: LoadingIcon
            })
            let response = await fetch(`https://fakesticker.m4fn3.repl.co/apng?id=${stickerId}&size=160`, {
                method: "GET"
            })
            if (response.status === 200) {
                let res = await response.json()
                MessageStore.sendMessage(
                    channelId, {content: res.url}
                )
            } else {
                Toasts.open({
                    content: "Something went wrong while processing a sticker.",
                    source: FailIcon
                })
            }
        }

        if (Object.isFrozen(PermStat.default)) {
            PermStat.default = {...PermStat.default}
        }

        Patcher.instead(PermStat.default, "canUseStickersEverywhere", (_, args, org) => {
            return true
        })
        Patcher.after(PermStat2, "isSendableSticker", (_, args, org) => {
            return true
        })
        Patcher.instead(MessageStore, "sendStickers", (_, args, org) => {
            const channel = ChannelStore.getChannel(args[0])
            const sticker = StickerStore.getStickerById(args[1][0])

            if (channel.guild_id === sticker.guild_id) {
                return org.apply(self, args)
            } else if (channel.guild_id && !Permissions.can(Constants.Permissions.EMBED_LINKS, channel)) {
                Toasts.open({
                    content: "Embed Link is disabled in this channel",
                    source: FailIcon
                })
            } else {
                if (sticker.format_type === 1) { // png
                    return MessageStore.sendMessage(
                        channel.id, {content: `https://media.discordapp.net/stickers/${sticker.id}.png?size=160`}
                    )
                } else if (sticker.format_type === 2) { // apng
                    sendApngSticker(sticker.id, channel.id).then()
                } else if (sticker.format_type === 3) { // lottie
                    return MessageStore.sendMessage(
                        channel.id, {content: `https://raw.githubusercontent.com/m4fn3/RawStickers/master/${sticker.pack_id}/${sticker.id}.gif`}
                    )
                }
            }
        })

    },
    onStop() {
        Patcher.unpatchAll()
    },
    getSettingsPanel({settings}) {
        return <Settings settings={settings}/>
    }
}

registerPlugin(FakeSticker)
