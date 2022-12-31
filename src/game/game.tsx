import './game.scss';
import { ReactElement, useState } from 'react';
import { ActivePlayer, Board } from './components/board/board';
import { Feed } from './components/feed/feed';

interface IFeedItem {
  id: number;
  text: string;
}

export function Game(): ReactElement {
  const [feed] = useState<IFeedItem[]>([
    {
      id: 0,
      text: '1. Go to game start',
    },
  ]);
  const feedList: ReactElement[] = feed.map((feedItem: IFeedItem): ReactElement => {
    return (
      <p key={feedItem.id} className={'feed-item'}>
        {feedItem.text}
      </p>
    );
  });

  const [isXNextPlayer] = useState<boolean>(true);
  const activePlayer: ActivePlayer = isXNextPlayer ? 'X' : 'O';

  return (
    <div className={'game'}>
      <div className={'board-container'}>
        <Board activePlayer={activePlayer}></Board>
      </div>
      <div className={'information'}>
        <p className={'active-player'}>Next player: {activePlayer}</p>
        <Feed>{feedList}</Feed>
      </div>
    </div>
  );
}
