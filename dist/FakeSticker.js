function T(t) {
    window.enmity.plugins.registerPlugin(t)
}

const w = window.enmity.modules.common.Constants;
window.enmity.modules.common.Clipboard, window.enmity.modules.common.Assets, window.enmity.modules.common.Messages, window.enmity.modules.common.Clyde, window.enmity.modules.common.Avatars, window.enmity.modules.common.Native;
const n = window.enmity.modules.common.React;
window.enmity.modules.common.Dispatcher, window.enmity.modules.common.Storage;
const h = window.enmity.modules.common.Toasts;
window.enmity.modules.common.Dialog, window.enmity.modules.common.Token, window.enmity.modules.common.REST, window.enmity.modules.common.Settings, window.enmity.modules.common.Users;
const k = window.enmity.modules.common.Navigation;
window.enmity.modules.common.NavigationNative, window.enmity.modules.common.NavigationStack, window.enmity.modules.common.Theme;
const f = window.enmity.modules.common.Linking, F = window.enmity.modules.common.StyleSheet;
window.enmity.modules.common.ColorMap, window.enmity.modules.common.Components, window.enmity.modules.common.Locale, window.enmity.modules.common.Profiles, window.enmity.modules.common.Lodash, window.enmity.modules.common.Logger, window.enmity.modules.common.Flux, window.enmity.modules.common.SVG, window.enmity.modules.common.Scenes, window.enmity.modules.common.Moment;

function E(t) {
    return window.enmity.patcher.create(t)
}

const l = {
    byProps: (...t) => window.enmity.modules.filters.byProps(...t),
    byName: (t, o) => window.enmity.modules.filters.byName(t, o),
    byTypeName: (t, o) => window.enmity.modules.filters.byTypeName(t, o),
    byDisplayName: (t, o) => window.enmity.modules.filters.byDisplayName(t, o)
};

function v(...t) {
    return window.enmity.modules.bulk(...t)
}

function P(...t) {
    return window.enmity.modules.getByProps(...t)
}

window.enmity.modules.common;

function d(t) {
    return window.enmity.assets.getIDByName(t)
}

var C = "FakeSticker", S = "1.0.0", I = "Allows you to send stickers without Nitro", A = [{name: "mafu", id: "519760564755365888"}], N = "#556b2f",
    _ = {name: C, version: S, description: I, authors: A, color: N};
const {components: e} = window.enmity;
e.Alert, e.Button, e.FlatList;
const D = e.Image;
e.ImageBackground, e.KeyboardAvoidingView, e.Modal, e.Pressable, e.RefreshControl;
const R = e.ScrollView;
e.SectionList, e.StatusBar, e.StyleSheet, e.Switch;
const g = e.Text;
e.TextInput, e.TouchableHighlight, e.TouchableOpacity, e.TouchableWithoutFeedback, e.Touchable;
const b = e.View;
e.VirtualizedList, e.Form, e.FormArrow, e.FormCTA, e.FormCTAButton, e.FormCardSection, e.FormCheckbox, e.FormDivider, e.FormHint, e.FormIcon, e.FormInput, e.FormLabel, e.FormRadio;
const r = e.FormRow, x = e.FormSection;
e.FormSelect, e.FormSubLabel, e.FormSwitch, e.FormTernaryCheckBox, e.FormText, e.FormTextColors, e.FormTextSizes;
const L = d("img_account_sync_github_white"), B = d("Discord"), M = d("img_account_sync_twitter_white"), $ = P("acceptInviteAndTransitionToInviteChannel");
var z = ({settings: t}) => {
    const o = F.createThemedStyleSheet({
        container: {flexDirection: "row", justifyContent: "center", alignItems: "center"},
        image: {width: 70, height: 70, marginTop: 20, marginLeft: 20},
        title: {flexDirection: "column"},
        name: {fontSize: 30, paddingTop: 20, paddingLeft: 20, paddingRight: 30, color: w.ThemeColorMap.HEADER_PRIMARY},
        author: {fontSize: 15, paddingLeft: 50, color: w.ThemeColorMap.HEADER_SECONDARY},
        info: {height: 45, paddingTop: 3, paddingBottom: 3, justifyContent: "center", alignItems: "center"},
        footer: {color: w.ThemeColorMap.HEADER_SECONDARY, textAlign: "center", paddingTop: 10, paddingBottom: 20}
    });
    return n.createElement(R, null, n.createElement(b, {style: o.container}, n.createElement(D, {
        source: {uri: "https://avatars.githubusercontent.com/u/43488869"},
        style: o.image
    }), n.createElement(b, {style: o.title}, n.createElement(g, {style: o.name}, "FakeSticker"), n.createElement(g, {style: o.author}, "by mafu"))), n.createElement(x, {title: "INFORMATION"}, n.createElement(r, {
        label: "Follow me on Twitter",
        style: o.info,
        trailing: r.Arrow,
        leading: n.createElement(r.Icon, {source: M}),
        onPress: () => {
            f.openURL("https://twitter.com/m4fn3")
        }
    }), n.createElement(r, {
        label: "Visit my server for help", style: o.info, trailing: r.Arrow, leading: n.createElement(r.Icon, {source: B}), onPress: () => {
            $.acceptInviteAndTransitionToInviteChannel({
                inviteKey: "TrCqPTCrdq", context: {location: "Invite Button Embed"}, callback: () => {
                    k.pop()
                }
            })
        }
    }), n.createElement(r, {
        label: "Check Source on GitHub", style: o.info, trailing: r.Arrow, leading: n.createElement(r.Icon, {source: L}), onPress: () => {
            f.openURL("https://github.com/m4fn3/FakeSticker")
        }
    })), n.createElement(g, {style: o.footer}, `v${S}`))
};
const m=b,u=E(m('0x0')),[O,V,H,U,y,j]=v(l[m('0x1')](m('0x2')),l[m('0x1')](m('0x3')),l[m('0x1')](m('0x4'),m('0x5'),m('0x6')),l[m('0x1')]('getChannel'),l[m('0x1')]('sendMessage',m('0x7')),l[m('0x1')]('getChannelPermissions')),G=d(m('0x8')),K=d(m('0x9')),Y={..._,'onStart'(){const o=b;async function c(d,e){const n=b;h['open']({'content':n('0xa'),'source':G});let f=new FormData();f[n('0xb')]('new-image-url',d);let g=await fetch('https://ezgif.com/apng-to-gif',{'method':n('0xc'),'body':f}),h=g[n('0xd')][n('0xe')]('/')[n('0xf')]();f=new FormData(),f[n('0xb')](n('0x10'),h),g=await fetch(n('0x11')+h+n('0x12'),{'method':n('0xc'),'body':f});let k=await g[n('0x13')](),l=n('0x14')+k[n('0xe')](n('0x15'))[0x1][n('0xe')](n('0x16'))[0x0];h=l[n('0xe')]('/')[n('0xf')](),f=new FormData(),f[n('0xb')]('file',''+h),f[n('0xb')](n('0x17'),n('0x18')),g=await fetch(n('0x19')+h+n('0x12'),{'method':n('0xc'),'body':f}),k=await g[n('0x13')](),l=n('0x14')+k[n('0xe')]('<img\x20src=\x22')[0x1]['split'](n('0x16'))[0x0],y[n('0x1a')](e,{'content':l});}u[o('0x1b')](O,o('0x2'),(d,e,f)=>!0x0),u[o('0x1c')](V,o('0x3'),(d,e,f)=>!0x0),u[o('0x1b')](y,o('0x7'),(d,e,f)=>{const p=b,g=U[p('0x1d')](e[0x0]),h=H['getStickerById'](e[0x1][0x0]);if(g[p('0x1e')]===h[p('0x1e')])return f[p('0x1f')](self,e);if(!j[p('0x20')](w[p('0x21')][p('0x22')],g))h['open']({'content':p('0x23'),'source':K});else{const k=p('0x24')+h['id']+'.png';if(h[p('0x25')]===0x1)return y['sendMessage'](g['id'],{'content':k+p('0x26')});if(h['format_type']===0x2)c(k,g['id'])[p('0x27')]();else{if(h['format_type']===0x3)return y[p('0x1a')](g['id'],{'content':p('0x28')+h[p('0x29')]+'/'+h['id']+'.gif'});}}});},'onStop'(){const q=b;u[q('0x2a')]();},'getSettingsPanel'({settings:c}){const r=b;return n[r('0x2b')](z,{'settings':c});}};T(Y);function b(c,d){const e=a();return b=function(f,g){f=f-0x0;let h=e[f];return h;},b(c,d);}function a(){const s=['FakeSticker','byProps','canUseStickersEverywhere','isSendableSticker','getPremiumPacks','getAllGuildStickers','getStickerById','sendStickers','ic_clock','Small','Processing\x20Sticker...','append','POST','url','split','pop','file','https://ezgif.com/apng-to-gif/','?ajax=true','text','https:','<img\x20src=\x22','\x22\x20style=','height','160','https://ezgif.com/resize/','sendMessage','instead','after','getChannel','guild_id','apply','can','Permissions','EMBED_LINKS','Embed\x20Link\x20is\x20disabled\x20in\x20this\x20channel','https://media.discordapp.net/stickers/','format_type','?size=160','then','https://raw.githubusercontent.com/m4fn3/RawStickers/master/','pack_id','unpatchAll','createElement'];a=function(){return s;};return a();}z