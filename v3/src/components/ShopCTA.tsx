import styled, { keyframes } from 'styled-components'
import { Spacer } from './Spacer'

export const ShopCTA = ({ open }: { open: boolean }) => {
  return (
    <Wrapper>
      {!open && <SvgWrapper>{svg}</SvgWrapper>}
      <Spacer size={56} />
      <Inner open={open} {...(open && { as: 'a', href: '/shop' })}>
        <Title>the friday shop</Title>
        <Spacer size={8} />
        <Subtitle>{open ? '~ open ~' : 'closed'}</Subtitle>
      </Inner>
      <Spacer size={56} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`

const Inner = styled.div<{ open: boolean }>`
  font-family: 'Yeseva One';
  font-size: 64px;
  color: ${({ theme }) => theme.colors.gray1};
  background-color: ${({ theme, open }) => (open ? theme.colors.primary11 : theme.colors.gray8)};
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: clamp(42px, 6vw + 1rem, 96px);

  ::selection {
    color: ${({ theme }) => theme.colors.primary2};
    background: ${({ theme }) => theme.colors.gray12};
  }
`

const Subtitle = styled.span`
  font-size: 24px;
  font-family: 'Plus Jakarta Sans';
  ::selection {
    color: ${({ theme }) => theme.colors.primary2};
    background: ${({ theme }) => theme.colors.gray12};
  }
`

const swing = keyframes`
  0% {
    transform: translateX(-50%) rotateZ(3deg);
  }
  100% {
    transform: translateX(-50%) rotateZ(-3deg);
  }
`

const SvgWrapper = styled.div`
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotateZ(10deg);
  transform-origin: top center;
  animation: ${swing} 4s ease-in-out infinite alternate;
`

const svg = (
  <svg height="100%" viewBox="0 0 236 211" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="121" width="236" height="90" rx="13" fill="#2D2D2D" />
    <path
      d="M55.5753 166.72c-4.096 0-7.28-1.12-9.552-3.36-2.272-2.272-3.408-5.392-3.408-9.36 0-3.968 1.136-7.072 3.408-9.312 2.272-2.272 5.456-3.408 9.552-3.408 2.944 0 5.152.512 6.624 1.536 1.504 1.024 2.256 2.272 2.256 3.744 0 1.088-.336 1.968-1.008 2.64-.64.64-1.504.96-2.592.96-.448 0-.896-.032-1.344-.096l-.576-.144v-7.2l-.672-.24c-.48-.16-1.056-.24-1.728-.24-1.824 0-3.248.864-4.272 2.592-.992 1.728-1.488 4.784-1.488 9.168 0 4.256.496 7.248 1.488 8.976 1.024 1.696 2.448 2.544 4.272 2.544 1.248 0 2.4-.288 3.456-.864 1.088-.608 1.936-1.392 2.544-2.352.64-.992.96-2 .96-3.024h1.2c0 1.28-.384 2.496-1.152 3.648-.768 1.152-1.84 2.08-3.216 2.784-1.376.672-2.96 1.008-4.752 1.008Zm12.4931-1.44 2.88-.72v-30.72l-2.88-.72v-.72h6.24c2.88 0 4.32 1.44 4.32 4.32v27.84l2.88.72v.72h-13.44v-.72Zm29.0325 1.44c-3.968 0-7.088-1.12-9.36-3.36-2.24-2.272-3.36-5.392-3.36-9.36 0-3.968 1.12-7.072 3.36-9.312 2.272-2.272 5.392-3.408 9.36-3.408 3.9681 0 7.0721 1.136 9.3121 3.408 2.272 2.24 3.408 5.344 3.408 9.312 0 3.968-1.136 7.088-3.408 9.36-2.24 2.24-5.344 3.36-9.3121 3.36Zm0-.96c1.28 0 2.352-.896 3.2161-2.688.896-1.792 1.344-4.816 1.344-9.072 0-4.256-.448-7.28-1.344-9.072-.8641-1.792-1.9361-2.688-3.2161-2.688s-2.368.896-3.264 2.688c-.864 1.792-1.296 4.816-1.296 9.072 0 4.256.432 7.28 1.296 9.072.896 1.792 1.984 2.688 3.264 2.688Zm27.8571.96c-1.984 0-3.76-.432-5.328-1.296-.768-.416-1.392-.864-1.872-1.344-.512.704-1.072 1.248-1.68 1.632-.288.192-.608.368-.96.528h-1.2v-8.16h1.92c.416 1.344 1.024 2.592 1.824 3.744 1.696 2.464 3.808 3.696 6.336 3.696 1.344 0 2.352-.32 3.024-.96.704-.672 1.056-1.632 1.056-2.88 0-1.056-.48-1.936-1.44-2.64-.928-.736-2.4-1.632-4.416-2.688-1.728-.864-3.136-1.632-4.224-2.304-1.056-.704-1.968-1.568-2.736-2.592-.736-1.056-1.104-2.288-1.104-3.696 0-1.92.816-3.472 2.448-4.656 1.664-1.216 4.208-1.824 7.632-1.824 1.696 0 3.264.448 4.704 1.344.704.416 1.312.848 1.824 1.296.416-.576.976-1.12 1.68-1.632.544-.32.864-.496.96-.528h1.2v8.16h-1.92c-.48-1.376-1.072-2.608-1.776-3.696-1.6-2.496-3.504-3.744-5.712-3.744-.864 0-1.6.32-2.208.96-.608.64-.912 1.44-.912 2.4 0 1.216.512 2.24 1.536 3.072 1.024.8 2.576 1.728 4.656 2.784 1.696.864 3.04 1.632 4.032 2.304 1.024.64 1.888 1.44 2.592 2.4.736.96 1.104 2.08 1.104 3.36 0 4.64-3.68 6.96-11.04 6.96Zm27.602 0c-4.096 0-7.28-1.12-9.552-3.36-2.272-2.272-3.408-5.392-3.408-9.36 0-2.592.496-4.848 1.488-6.768s2.368-3.392 4.128-4.416c1.792-1.024 3.84-1.536 6.144-1.536 2.304 0 4.32.432 6.048 1.296 1.76.864 3.104 2.032 4.032 3.504.96 1.44 1.44 3.04 1.44 4.8 0 .8-.08 1.488-.24 2.064l-.24.816c-1.376.288-2.864.528-4.464.72-3.36.48-6.752.72-10.176.72 0 3.712.512 6.368 1.536 7.968 1.024 1.568 2.432 2.352 4.224 2.352 1.248 0 2.4-.288 3.456-.864 1.088-.608 1.936-1.392 2.544-2.352.64-.992.96-2 .96-3.024h1.2c0 1.28-.384 2.496-1.152 3.648-.768 1.152-1.84 2.08-3.216 2.784-1.376.672-2.96 1.008-4.752 1.008Zm-4.8-12.72c2.048 0 3.712-.08 4.992-.24.544-.032 1.12-.112 1.728-.24.032-.16.112-.512.24-1.056.16-.8.24-1.648.24-2.544 0-2.656-.352-4.592-1.056-5.808-.704-1.248-1.552-1.872-2.544-1.872-2.4 0-3.6 3.92-3.6 11.76Zm28.539 12.72c-1.888 0-3.568-.48-5.04-1.44-1.472-.992-2.64-2.432-3.504-4.32-.864-1.92-1.296-4.24-1.296-6.96 0-4.096.944-7.232 2.832-9.408 1.92-2.208 4.496-3.312 7.728-3.312 1.536 0 2.88.32 4.032.96.48.224.976.544 1.488.96v-9.36l-2.88-.72v-.72h6.24c2.88 0 4.32 1.44 4.32 4.32v27.84l2.88.72v.72h-4.32c-1.92 0-3.408-.592-4.464-1.776-.448-.48-.8-1.088-1.056-1.824-.416.8-.944 1.52-1.584 2.16-1.44 1.44-3.232 2.16-5.376 2.16Zm1.92-1.68c1.184 0 2.256-.64 3.216-1.92.352-.48.72-1.12 1.104-1.92v-16.56c-.352-.352-.72-.672-1.104-.96-.864-.64-1.696-.96-2.496-.96-1.376 0-2.448.8-3.216 2.4-.736 1.6-1.104 4.56-1.104 8.88 0 4.128.336 7.008 1.008 8.64.704 1.6 1.568 2.4 2.592 2.4ZM46.5629 187.159c-.716 0-1.3324-.169-1.8495-.507-.517-.338-.9147-.804-1.1932-1.397-.2784-.593-.4176-1.271-.4176-2.033 0-.776.1425-1.46.4276-2.054.2883-.596.6894-1.062 1.2031-1.397.5171-.338 1.1203-.507 1.8097-.507.5369 0 1.0208.1 1.4517.298.4308.199.7838.478 1.0589.836.2751.358.4458.775.5121 1.253h-1.1733c-.0895-.348-.2884-.657-.5966-.925-.3049-.272-.7159-.408-1.2329-.408-.4574 0-.8585.119-1.2032.358-.3414.235-.6082.569-.8004.999-.1889.428-.2834.93-.2834 1.507 0 .59.0928 1.104.2784 1.541.189.438.4541.777.7955 1.019.3447.242.749.363 1.2131.363.3049 0 .5816-.053.8302-.159.2486-.106.4591-.258.6314-.457.1724-.199.295-.438.3679-.716h1.1733c-.0663.45-.2304.856-.4922 1.218-.2585.358-.6016.643-1.0291.855-.4243.209-.9181.313-1.4815.313Zm7.8203 0c-.6894 0-1.2943-.164-1.8147-.492-.517-.328-.9214-.787-1.213-1.377-.2884-.59-.4326-1.28-.4326-2.068 0-.796.1442-1.49.4326-2.084.2916-.593.696-1.053 1.213-1.382.5204-.328 1.1253-.492 1.8147-.492s1.2926.164 1.8096.492c.5204.329.9247.789 1.2131 1.382.2917.594.4375 1.288.4375 2.084 0 .788-.1458 1.478-.4375 2.068-.2884.59-.6927 1.049-1.2131 1.377-.517.328-1.1202.492-1.8096.492Zm0-1.054c.5236 0 .9545-.134 1.2926-.403.338-.268.5883-.621.7507-1.059.1624-.437.2436-.911.2436-1.421 0-.511-.0812-.986-.2436-1.427-.1624-.441-.4127-.797-.7507-1.069-.3381-.272-.769-.408-1.2926-.408-.5237 0-.9546.136-1.2926.408-.3381.272-.5884.628-.7508 1.069-.1624.441-.2436.916-.2436 1.427 0 .51.0812.984.2436 1.421.1624.438.4127.791.7508 1.059.338.269.7689.403 1.2926.403Zm5.2512.895v-7.636h1.1335v1.193h.0995c.1591-.408.4159-.724.7706-.95.3546-.228.7805-.343 1.2777-.343.5037 0 .923.115 1.2578.343.338.226.6015.542.7905.95h.0795c.1956-.395.4889-.708.88-.94.3911-.235.8601-.353 1.4069-.353.6828 0 1.2413.214 1.6755.642.4341.424.6512 1.085.6512 1.983V187h-1.1733v-5.111c0-.563-.1541-.966-.4623-1.208-.3083-.242-.6712-.363-1.0888-.363-.5369 0-.9529.163-1.2479.487-.2949.322-.4424.73-.4424 1.223V187h-1.1932v-5.23c0-.434-.1409-.784-.4226-1.049-.2817-.269-.6447-.403-1.0888-.403-.3049 0-.5899.081-.8551.244-.2618.162-.474.388-.6364.676-.159.285-.2386.615-.2386.989V187h-1.1733Zm15.3697.159c-.7358 0-1.3705-.162-1.9041-.487-.5303-.328-.9397-.786-1.228-1.372-.2851-.59-.4276-1.276-.4276-2.059 0-.782.1425-1.471.4276-2.068.2883-.6.6894-1.067 1.2031-1.402.5171-.338 1.1203-.507 1.8097-.507.3977 0 .7904.066 1.1782.199.3878.133.7408.348 1.059.646.3182.295.5717.686.7606 1.174.189.487.2834 1.087.2834 1.799v.498h-5.8863v-1.015h4.6931c0-.431-.0861-.815-.2585-1.153-.169-.338-.411-.605-.7258-.8-.3116-.196-.6795-.294-1.1037-.294-.4674 0-.8717.116-1.2131.348-.3381.229-.5983.527-.7805.895-.1823.368-.2735.762-.2735 1.183v.676c0 .577.0995 1.066.2983 1.467.2022.398.4823.701.8402.91.358.205.7739.308 1.2479.308.3082 0 .5866-.043.8352-.129.2519-.09.469-.222.6513-.398.1823-.179.3231-.401.4226-.666l1.1335.318c-.1193.385-.3198.723-.6016 1.014-.2817.289-.6297.514-1.044.676-.4143.16-.88.239-1.397.239Zm9.0433-.159v-10.182h1.1733v3.759h.0994c.0862-.133.2055-.302.358-.507.1558-.209.3778-.395.6662-.557.2916-.166.6861-.249 1.1832-.249.643 0 1.2098.161 1.7003.482.4905.322.8733.778 1.1484 1.368.2751.59.4127 1.286.4127 2.088 0 .808-.1376 1.509-.4127 2.103-.2751.59-.6562 1.047-1.1434 1.372-.4872.321-1.049.482-1.6854.482-.4905 0-.8833-.081-1.1783-.244-.2949-.165-.522-.353-.6811-.561-.1591-.212-.2817-.388-.3679-.527h-.1392V187h-1.1335Zm1.1534-3.818c0 .577.0845 1.085.2536 1.526.169.438.4159.781.7407 1.029.3248.245.7226.368 1.1932.368.4905 0 .8999-.129 1.228-.388.3314-.262.58-.613.7457-1.054.1691-.444.2536-.938.2536-1.481 0-.537-.0829-1.021-.2486-1.452-.1624-.434-.4093-.777-.7408-1.029-.3281-.255-.7407-.383-1.2379-.383-.4773 0-.8783.121-1.2031.363-.3248.239-.5701.573-.7358 1.004-.1657.428-.2486.927-.2486 1.497Zm9.63 3.997c-.4839 0-.9231-.091-1.3175-.273-.3944-.186-.7076-.453-.9396-.801-.232-.351-.348-.775-.348-1.273 0-.437.0861-.792.2585-1.064.1723-.275.4027-.49.691-.646.2884-.156.6066-.272.9546-.348.3513-.079.7043-.142 1.0589-.189.4641-.059.8402-.104 1.1286-.134.2917-.033.5038-.088.6364-.164.1358-.076.2038-.209.2038-.398v-.04c0-.49-.1342-.871-.4027-1.143-.2652-.272-.6679-.408-1.2081-.408-.5601 0-.9993.123-1.3175.368-.3182.245-.5419.507-.6711.786l-1.1137-.398c.1989-.464.464-.825.7955-1.084.3347-.262.6993-.444 1.0937-.547.3978-.106.7889-.159 1.1733-.159.2453 0 .527.03.8452.09.3215.056.6314.174.9297.353.3016.179.5518.449.7507.81.1989.361.2983.845.2983 1.452V187h-1.1733v-1.034h-.0597c-.0795.166-.2121.343-.3977.532s-.4325.35-.7408.482c-.3082.133-.6844.199-1.1285.199Zm.179-1.054c.464 0 .8551-.091 1.1733-.273.3215-.183.5634-.418.7258-.706.1657-.289.2486-.592.2486-.91v-1.074c-.0497.06-.1591.114-.3281.164-.1658.046-.358.088-.5767.124-.2155.033-.4259.063-.6314.09-.2022.023-.3663.043-.4922.059-.3049.04-.59.105-.8551.194-.2619.086-.474.217-.6364.393-.1591.172-.2386.408-.2386.706 0 .408.1508.716.4524.925.3049.205.691.308 1.1584.308Zm8.5652 1.034c-.716 0-1.333-.169-1.85-.507-.517-.338-.915-.804-1.193-1.397s-.418-1.271-.418-2.033c0-.776.143-1.46.428-2.054.288-.596.689-1.062 1.203-1.397.517-.338 1.12-.507 1.81-.507.537 0 1.021.1 1.451.298.431.199.784.478 1.059.836.275.358.446.775.512 1.253h-1.173c-.089-.348-.288-.657-.596-.925-.305-.272-.716-.408-1.233-.408-.458 0-.859.119-1.204.358-.341.235-.608.569-.8.999-.189.428-.283.93-.283 1.507 0 .59.092 1.104.278 1.541.189.438.454.777.796 1.019.344.242.749.363 1.213.363.304 0 .581-.053.83-.159.248-.106.459-.258.631-.457.173-.199.295-.438.368-.716h1.173c-.066.45-.23.856-.492 1.218-.258.358-.601.643-1.029.855-.424.209-.918.313-1.481.313Zm5.811-2.943-.02-1.452h.239l3.341-3.4h1.452l-3.56 3.599h-.099l-1.353 1.253ZM108.293 187v-10.182h1.173V187h-1.173Zm4.852 0-2.983-3.778.835-.816 3.639 4.594h-1.491Zm7.874-4.594V187h-1.174v-7.636h1.134v1.193h.099c.179-.388.451-.7.816-.935.364-.238.835-.358 1.412-.358.517 0 .969.106 1.357.318.388.209.689.527.905.955.215.424.323.961.323 1.611V187h-1.173v-4.773c0-.6-.156-1.067-.468-1.402-.311-.338-.739-.507-1.282-.507-.375 0-.71.081-1.005.244-.291.162-.522.399-.691.711-.169.311-.253.689-.253 1.133Zm10.218 4.753c-.736 0-1.371-.162-1.905-.487-.53-.328-.939-.786-1.228-1.372-.285-.59-.427-1.276-.427-2.059 0-.782.142-1.471.427-2.068.289-.6.69-1.067 1.204-1.402.517-.338 1.12-.507 1.809-.507.398 0 .791.066 1.178.199.388.133.741.348 1.059.646.319.295.572.686.761 1.174.189.487.283 1.087.283 1.799v.498h-5.886v-1.015h4.693c0-.431-.086-.815-.258-1.153-.169-.338-.411-.605-.726-.8-.312-.196-.68-.294-1.104-.294-.467 0-.871.116-1.213.348-.338.229-.598.527-.78.895-.183.368-.274.762-.274 1.183v.676c0 .577.1 1.066.298 1.467.203.398.483.701.841.91.358.205.774.308 1.248.308.308 0 .586-.043.835-.129.252-.09.469-.222.651-.398.182-.179.323-.401.423-.666l1.133.318c-.119.385-.32.723-.601 1.014-.282.289-.63.514-1.044.676-.415.16-.88.239-1.397.239Zm5.616-7.795 1.83 3.122 1.829-3.122h1.353l-2.466 3.818 2.466 3.818h-1.353l-1.829-2.963-1.83 2.963h-1.352l2.426-3.818-2.426-3.818h1.352Zm10.007 0v.994h-3.958v-.994h3.958Zm-2.804-1.83h1.173v7.278c0 .332.048.581.144.746.1.163.226.272.378.328.156.053.32.08.492.08.13 0 .236-.007.318-.02.083-.017.15-.03.199-.04l.239 1.054c-.08.03-.191.06-.333.09-.143.033-.323.049-.542.049-.332 0-.656-.071-.974-.213-.315-.143-.577-.36-.786-.652-.206-.291-.308-.659-.308-1.103v-7.597Zm11.907 1.83v.994h-4.117v-.994h4.117ZM153.079 187v-8.69c0-.438.103-.802.308-1.094.206-.292.473-.511.801-.656.328-.146.674-.219 1.039-.219.288 0 .524.023.706.07.182.046.318.089.408.129l-.339 1.014c-.059-.02-.142-.045-.248-.075-.103-.029-.239-.044-.408-.044-.388 0-.668.097-.84.293-.169.196-.254.482-.254.86V187h-1.173Zm4.528 0v-7.636h1.134v1.153h.079c.139-.378.391-.684.756-.92.364-.235.775-.353 1.233-.353.086 0 .194.002.323.005.129.004.227.009.293.015v1.193c-.04-.01-.131-.024-.273-.044-.139-.024-.287-.035-.443-.035-.371 0-.702.078-.994.234-.288.152-.517.364-.686.636-.166.268-.249.575-.249.92V187h-1.173Zm5.209 0v-7.636h1.173V187h-1.173Zm.597-8.909c-.229 0-.426-.078-.592-.234-.162-.156-.244-.343-.244-.562 0-.218.082-.406.244-.561.166-.156.363-.234.592-.234.228 0 .424.078.586.234.166.155.249.343.249.561 0 .219-.083.406-.249.562-.162.156-.358.234-.586.234Zm5.609 9.068c-.637 0-1.198-.161-1.686-.482-.487-.325-.868-.782-1.143-1.372-.275-.594-.413-1.295-.413-2.103 0-.802.138-1.498.413-2.088.275-.59.658-1.046 1.148-1.368.491-.321 1.058-.482 1.701-.482.497 0 .89.083 1.178.249.292.162.514.348.666.557.156.205.277.374.363.507h.1v-3.759h1.173V187h-1.134v-1.173h-.139c-.086.139-.209.315-.368.527-.159.208-.386.396-.681.561-.295.163-.688.244-1.178.244Zm.159-1.054c.471 0 .868-.123 1.193-.368.325-.248.572-.591.741-1.029.169-.441.253-.949.253-1.526 0-.57-.082-1.069-.248-1.497-.166-.431-.411-.765-.736-1.004-.325-.242-.726-.363-1.203-.363-.497 0-.912.128-1.243.383-.328.252-.575.595-.741 1.029-.162.431-.243.915-.243 1.452 0 .543.083 1.037.248 1.481.169.441.418.792.746 1.054.331.259.742.388 1.233.388Zm7.9 1.074c-.484 0-.923-.091-1.318-.273-.394-.186-.707-.453-.939-.801-.232-.351-.348-.775-.348-1.273 0-.437.086-.792.258-1.064.173-.275.403-.49.691-.646.289-.156.607-.272.955-.348.351-.079.704-.142 1.059-.189.464-.059.84-.104 1.128-.134.292-.033.504-.088.637-.164.136-.076.203-.209.203-.398v-.04c0-.49-.134-.871-.402-1.143-.265-.272-.668-.408-1.208-.408-.56 0-1 .123-1.318.368-.318.245-.542.507-.671.786l-1.114-.398c.199-.464.464-.825.796-1.084.335-.262.699-.444 1.094-.547.397-.106.788-.159 1.173-.159.245 0 .527.03.845.09.322.056.631.174.93.353.301.179.552.449.75.81.199.361.299.845.299 1.452V187h-1.174v-1.034h-.059c-.08.166-.212.343-.398.532-.185.189-.432.35-.741.482-.308.133-.684.199-1.128.199Zm.179-1.054c.464 0 .855-.091 1.173-.273.322-.183.564-.418.726-.706.166-.289.248-.592.248-.91v-1.074c-.049.06-.159.114-.328.164-.165.046-.358.088-.576.124-.216.033-.426.063-.632.09-.202.023-.366.043-.492.059-.305.04-.59.105-.855.194-.262.086-.474.217-.636.393-.159.172-.239.408-.239.706 0 .408.151.716.452.925.305.205.691.308 1.159.308Zm5.945 3.739c-.199 0-.377-.017-.532-.05-.156-.03-.264-.06-.324-.09l.299-1.034c.285.073.537.1.755.08.219-.02.413-.118.582-.293.172-.173.33-.453.472-.841l.219-.596-2.824-7.676h1.273l2.108 6.085h.079l2.108-6.085h1.273l-3.241 8.75c-.146.394-.327.721-.542.979-.216.262-.466.456-.751.582-.282.126-.6.189-.954.189Zm8.308-4.256-.079.537c-.057.378-.143.782-.259 1.213-.112.431-.23.837-.353 1.218-.122.381-.223.684-.303.91h-.895c.043-.212.1-.492.169-.84.07-.348.139-.738.209-1.169.073-.427.133-.865.179-1.312l.06-.557h1.272Zm-110.9519 9.466-1.054.298c-.0663-.176-.1641-.346-.2933-.512-.126-.169-.2983-.308-.5171-.418-.2187-.109-.4988-.164-.8402-.164-.4673 0-.8567.108-1.1683.324-.3082.212-.4623.482-.4623.81 0 .292.106.522.3181.691.2122.169.5436.31.9944.423l1.1335.278c.6827.166 1.1915.419 1.5263.761.3347.338.5021.774.5021 1.307 0 .438-.126.829-.3779 1.173-.2485.345-.5965.617-1.044.816-.4474.199-.9678.298-1.5611.298-.7789 0-1.4235-.169-1.9339-.507-.5104-.338-.8336-.832-.9695-1.482l1.1137-.278c.106.411.3065.719.6015.925.2983.205.6878.308 1.1683.308.5469 0 .9811-.116 1.3026-.348.3248-.235.4872-.517.4872-.845 0-.265-.0928-.487-.2784-.666-.1856-.183-.4706-.319-.8551-.408l-1.2727-.298c-.6994-.166-1.2131-.423-1.5412-.771-.3248-.351-.4872-.79-.4872-1.317 0-.431.1209-.812.3629-1.144.2452-.331.5783-.591.9993-.78.4242-.189.9048-.284 1.4417-.284.7557 0 1.349.166 1.7799.497.4341.332.7424.769.9247 1.313ZM84.1966 201l-2.3267-7.636h1.2329l1.6506 5.846h.0795l1.6307-5.846h1.2528l1.6108 5.826h.0796l1.6506-5.826h1.2329L89.9636 201h-1.1534l-1.6705-5.866h-.1193L85.35 201h-1.1534Zm12.5868.159c-.7358 0-1.3705-.162-1.9041-.487-.5303-.328-.9397-.786-1.228-1.372-.2851-.59-.4276-1.276-.4276-2.059 0-.782.1425-1.471.4276-2.068.2883-.6.6894-1.067 1.2031-1.402.517-.338 1.1203-.507 1.8097-.507.3977 0 .7904.066 1.1782.199.3878.133.7408.348 1.059.646.3182.295.5717.686.7606 1.174.189.487.2834 1.087.2834 1.799v.498h-5.8864v-1.015h4.6932c0-.431-.0861-.815-.2585-1.153-.169-.338-.411-.605-.7258-.8-.3116-.196-.6795-.294-1.1037-.294-.4674 0-.8717.116-1.2131.348-.3381.229-.5983.527-.7805.895-.1823.368-.2735.762-.2735 1.183v.676c0 .577.0994 1.066.2983 1.467.2022.398.4823.701.8402.91.358.205.7739.308 1.2479.308.3082 0 .5866-.043.8352-.129.2519-.09.469-.222.6513-.398.1823-.179.3231-.401.4226-.666l1.1335.318c-.1193.385-.3198.723-.6016 1.014-.2817.289-.6297.514-1.044.676-.4143.16-.88.239-1.397.239Zm7.8306 0c-.637 0-1.199-.161-1.686-.482-.487-.325-.868-.782-1.143-1.372-.275-.594-.413-1.295-.413-2.103 0-.802.138-1.498.413-2.088.275-.59.658-1.046 1.148-1.368.491-.321 1.058-.482 1.701-.482.497 0 .889.083 1.178.249.291.162.514.348.666.557.156.205.277.374.363.507h.099v-3.759h1.174V201h-1.134v-1.173h-.139c-.086.139-.209.315-.368.527-.159.208-.386.396-.681.561-.295.163-.688.244-1.178.244Zm.159-1.054c.47 0 .868-.123 1.193-.368.325-.248.572-.591.741-1.029.169-.441.253-.949.253-1.526 0-.57-.083-1.069-.248-1.497-.166-.431-.411-.765-.736-1.004-.325-.242-.726-.363-1.203-.363-.497 0-.912.128-1.243.383-.328.252-.575.595-.741 1.029-.162.431-.244.915-.244 1.452 0 .543.083 1.037.249 1.481.169.441.418.792.746 1.054.331.259.742.388 1.233.388Zm5.652.895v-7.636h1.174V201h-1.174Zm.597-8.909c-.229 0-.426-.078-.592-.234-.162-.156-.243-.343-.243-.562 0-.218.081-.406.243-.561.166-.156.363-.234.592-.234.229 0 .424.078.587.234.165.155.248.343.248.561 0 .219-.083.406-.248.562-.163.156-.358.234-.587.234Zm8.135 2.983-1.054.298c-.066-.176-.164-.346-.294-.512-.125-.169-.298-.308-.517-.418-.218-.109-.498-.164-.84-.164-.467 0-.857.108-1.168.324-.308.212-.462.482-.462.81 0 .292.106.522.318.691.212.169.543.31.994.423l1.134.278c.682.166 1.191.419 1.526.761.335.338.502.774.502 1.307 0 .438-.126.829-.378 1.173-.248.345-.596.617-1.044.816-.447.199-.968.298-1.561.298-.779 0-1.423-.169-1.934-.507-.51-.338-.833-.832-.969-1.482l1.113-.278c.106.411.307.719.602.925.298.205.688.308 1.168.308.547 0 .981-.116 1.303-.348.325-.235.487-.517.487-.845 0-.265-.093-.487-.278-.666-.186-.183-.471-.319-.856-.408l-1.272-.298c-.7-.166-1.213-.423-1.542-.771-.324-.351-.487-.79-.487-1.317 0-.431.121-.812.363-1.144.245-.331.579-.591.999-.78.425-.189.905-.284 1.442-.284.756 0 1.349.166 1.78.497.434.332.742.769.925 1.313Zm3.078 1.332V201h-1.173v-10.182h1.173v3.739h.1c.179-.395.447-.708.805-.94.362-.235.842-.353 1.442-.353.52 0 .976.105 1.367.313.391.206.695.522.91.95.219.424.328.964.328 1.621V201h-1.173v-4.773c0-.606-.158-1.075-.472-1.407-.312-.334-.745-.502-1.298-.502-.385 0-.729.081-1.034.244-.302.162-.54.399-.716.711-.172.311-.259.689-.259 1.133Zm14.357-3.042v.994h-3.957v-.994h3.957Zm-2.804-1.83h1.173v7.278c0 .332.049.581.145.746.099.163.225.272.377.328.156.053.32.08.493.08.129 0 .235-.007.318-.02.083-.017.149-.03.199-.04l.238 1.054c-.079.03-.19.06-.333.09-.142.033-.323.049-.542.049-.331 0-.656-.071-.974-.213-.315-.143-.577-.36-.786-.652-.205-.291-.308-.659-.308-1.103v-7.597Zm4.569 9.466v-7.636h1.173V201h-1.173Zm.597-8.909c-.229 0-.426-.078-.592-.234-.162-.156-.244-.343-.244-.562 0-.218.082-.406.244-.561.166-.156.363-.234.592-.234.228 0 .424.078.586.234.166.155.249.343.249.561 0 .219-.083.406-.249.562-.162.156-.358.234-.586.234Zm2.725 8.909v-7.636h1.134v1.193h.099c.159-.408.416-.724.771-.95.355-.228.78-.343 1.278-.343.503 0 .923.115 1.257.343.338.226.602.542.791.95h.079c.196-.395.489-.708.88-.94.391-.235.86-.353 1.407-.353.683 0 1.242.214 1.676.642.434.424.651 1.085.651 1.983V201h-1.173v-5.111c0-.563-.154-.966-.463-1.208-.308-.242-.671-.363-1.088-.363-.537 0-.953.163-1.248.487-.295.322-.443.73-.443 1.223V201h-1.193v-5.23c0-.434-.141-.784-.422-1.049-.282-.269-.645-.403-1.089-.403-.305 0-.59.081-.855.244-.262.162-.474.388-.637.676-.159.285-.238.615-.238.989V201h-1.174Zm15.37.159c-.736 0-1.37-.162-1.904-.487-.53-.328-.94-.786-1.228-1.372-.285-.59-.428-1.276-.428-2.059 0-.782.143-1.471.428-2.068.288-.6.689-1.067 1.203-1.402.517-.338 1.12-.507 1.81-.507.397 0 .79.066 1.178.199.388.133.741.348 1.059.646.318.295.572.686.761 1.174.188.487.283 1.087.283 1.799v.498h-5.886v-1.015h4.693c0-.431-.086-.815-.259-1.153-.169-.338-.411-.605-.726-.8-.311-.196-.679-.294-1.103-.294-.468 0-.872.116-1.213.348-.338.229-.599.527-.781.895-.182.368-.273.762-.273 1.183v.676c0 .577.099 1.066.298 1.467.202.398.482.701.84.91.358.205.774.308 1.248.308.308 0 .587-.043.835-.129.252-.09.469-.222.652-.398.182-.179.323-.401.422-.666l1.134.318c-.12.385-.32.723-.602 1.014-.282.289-.63.514-1.044.676-.414.16-.88.239-1.397.239Z"
      fill="#fff"
    />
    <path
      stroke="#2D2D2D"
      stroke-width="2"
      d="M12.2394 124.351 117.239 1.35074M223.760565 124.350738 118.76061584 1.35064507"
    />
    <circle cx="118" cy="4" r="3.5" fill="#B8B8B8" stroke="#505050" />
  </svg>
)
