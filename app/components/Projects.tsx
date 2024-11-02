// import { DrawWTFButton } from './DrawWTFButton'
// import { FredagslunchenButton } from './FredagslunchenButton'
// import { KampgeneratorButton } from './KampgeneratorButton'
// import { PodcastButton } from './PodcastButton'
// import { Spacer } from './Spacer'
// import { TvShowQuiz } from './TvShowQuizButton'

import { AaaaaahhButton } from './AaaaaahhButton'
import { CharadgeneratornButton } from './CharadgeneratornButton'
import { DrawWTFButton } from './DrawWTFButton'
import { FredagslunchenButton } from './FredagslunchenButton'
import { TvShowQuiz } from './TvShowQuizButton'

export const Projects = () => {
  return (
    <div className="w-full flex justify-between py-2 px-1 max-w-[1500px] striped-bg">
      <div
        style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
        className="font-title text-[4rem] text-end transform rotate-180"
      >
        projects
      </div>
      <div className="flex items-center flex-wrap justify-around px-4">
        {/* <Spacer size={32} /> */}
        <DrawWTFButton style={{ marginBottom: -12 }} />
        {/* <Spacer size={32} /> */}
        <FredagslunchenButton style={{ marginTop: -12 }} />
        {/* <Spacer size={64} />
        <KampgeneratorButton style={{ marginTop: -24 }} />
        <Spacer size={96} /> */}
        <TvShowQuiz />
        {/* <Spacer size={96} /> */}
        <AaaaaahhButton />
        {/* <Spacer size={32} /> */}
        <CharadgeneratornButton style={{ marginTop: -36 }} />
        {/* <Spacer size={64} />
        <PodcastButton />
        <Spacer size={96} /> */}
      </div>
      <div
        style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
        className="font-title text-[4rem] text-end"
      >
        projects
      </div>
    </div>
  )
}

// TODO probably easier to do this with a grid and then offset the elements?
// const Inner = styled.div`
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   padding: 0 16px;
//   @media (max-width: 931px) {
//     flex-direction: column;
//     gap: 16px;
//   }
// `
