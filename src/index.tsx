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
        async function sendAnimatedSticker(stickerLink, channelId) {
            Toasts.open({
                content: "Processing Sticker...",
                source: LoadingIcon
            })

            // upload gif
            let form = new FormData()
            form.append('new-image-url', stickerLink)
            let response = await fetch(`https://ezgif.com/apng-to-gif`, {
                method: "POST",
                body: form
            })
            let file_id = response.url.split("/").pop()

            // convert apng to gif
            form = new FormData()
            form.append('file', file_id)
            response = await fetch(`https://ezgif.com/apng-to-gif/${file_id}?ajax=true`, {
                method: "POST",
                body: form
            })
            let content = await response.text()
            let gif_url = `https:${content.split("<img src=\"")[1].split("\" style=")[0]}`
            file_id = gif_url.split("/").pop()

            // resize gif
            form = new FormData()
            form.append('file', `${file_id}`)
            form.append('height', `160`)
            response = await fetch(`https://ezgif.com/resize/${file_id}?ajax=true`, {
                method: "POST",
                body: form
            })
            content = await response.text()
            gif_url = `https:${content.split("<img src=\"")[1].split("\" style=")[0]}`

            // send gif
            MessageStore.sendMessage(
                channelId, {content: gif_url}
            )
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
                const stickerLink = `https://media.discordapp.net/stickers/${sticker.id}.png`
                if (sticker.format_type === 1) { // png
                    return MessageStore.sendMessage(
                        channel.id, {content: `${stickerLink}?size=160`}
                    )
                } else if (sticker.format_type === 2) { // apng
                    sendAnimatedSticker(stickerLink, channel.id).then()
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
