import './game.scss';
import { ReactElement, useState } from 'react';
import { Board } from './components/board/board';
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

  return (
    <div className={'game'}>
      <div className={'board-container'}>
        <Board></Board>
      </div>
      <Feed>{feedList}</Feed>
    </div>
  );
}
