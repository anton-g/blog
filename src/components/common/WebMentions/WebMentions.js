import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Mention from './Mention'
import Likes from './Likes'

function WebMentions({ target, shareLink }) {
  const [mentions, setMentions] = useState(null)

  useEffect(() => {
    const page = 0

    const t = target?.slice(-1) === '/' ? target : target + '/'

    fetch(`https://webmention.io/api/mentions?page=${page}&per-page=50&target=${t}`)
      .then(x => x.json())
      .then(x => setMentions(x.links))
  }, [target])

  const rx = /^<a href=".*">.*<\/a>$/
  const likes = mentions?.filter(x => x.activity.type === 'like')
  const other = mentions?.filter(
    x => x.activity.type !== 'like' && x.activity.type !== 'repost' && !x.data.content?.match(rx)
  )

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Header>
        <Title>WebMentions</Title>
        <Help href="https://indieweb.org/Webmention" target="_blank">
          What's this?
        </Help>
      </Header>
      {likes?.length > 0 && <Likes likes={likes}></Likes>}
      {other?.length > 0 ? (
        <Mentions>
          {other.map(x => (
            <Mention key={x.id} data={x.data} />
          ))}
        </Mentions>
      ) : (
        <div>
          Nothing's here yet! <a href={shareLink}>Tweet</a> about this post to show up here.
        </div>
      )}
    </div>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`

const Title = styled.h2`
  margin: 0;
`

const Help = styled.a`
  font-size: 14px;
`

const Mentions = styled.div`
  margin-top: 8px;
`

export default WebMentions
