import './game.scss';
import { ReactElement, useReducer, useState } from 'react';
import { ActivePlayer, Board } from './components/board/board';
import { Feed } from './components/feed/feed';
import { cloneDeep } from 'lodash-es';

interface IFeedItem {
  id: number;
  text: string;
}

export function Game(): ReactElement {
  const [turn, turnDispatch] = useReducer(turnReducer, 1);

  function turnReducer(state: number, action: 'increment'): number | never {
    console.log(turnReducer.name);

    if (action === 'increment') {
      return state + 1;
    }

    throw new Error(`Bad action for ${turnReducer.name}`);
  }

  const [feed, setFeed] = useState<IFeedItem[]>([
    {
      id: 0,
      text: getFeedText(1, `Go to game start`),
    },
  ]);
  const feedList: ReactElement[] = feed.map((feedItem: IFeedItem): ReactElement => {
    return (
      <p key={feedItem.id} className={'feed-item'}>
        {feedItem.text}
      </p>
    );
  });

  function addFeedItem(): void {
    console.log(addFeedItem.name);

    setFeed((feed: IFeedItem[]): IFeedItem[] => {
      const newFeed: IFeedItem[] = cloneDeep(feed);

      newFeed.push({
        id: newFeed.length,
        text: getFeedText(newFeed.length + 1, `Go to move #${turn}`),
      });

      return newFeed;
    });
  }

  function getFeedText(step: number, text: string): string {
    return `${step}. ${text}`;
  }

  const [isXNextPlayer, setIsXNextPlayer] = useState<boolean>(true);
  const activePlayer: ActivePlayer = isXNextPlayer ? 'X' : 'O';

  function changeActivePlayer(): void {
    console.log(changeActivePlayer.name);

    setIsXNextPlayer((isXNextPlayer: boolean): boolean => {
      return !isXNextPlayer;
    });
  }

  function onSquareClick(): void {
    console.log(onSquareClick.name);

    addFeedItem();
    turnDispatch('increment');
    changeActivePlayer();
  }

  return (
    <div className={'game'}>
      <div className={'board-container'}>
        <Board activePlayer={activePlayer} onSquareClick={onSquareClick}></Board>
      </div>
      <div className={'information'}>
        <p className={'active-player'}>Next player: {activePlayer}</p>
        <Feed>{feedList}</Feed>
      </div>
    </div>
  );
}
