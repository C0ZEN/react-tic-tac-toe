import './game.scss';
import { ReactElement, useReducer, useState } from 'react';
import { ActivePlayer, Board, SquareList } from './components/board/board';
import { Feed } from './components/feed/feed';
import { cloneDeep } from 'lodash-es';

interface IFeedItem {
  id: number;
  text: string;
}

type WinningEntry = [number, number, number];

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
  const activePlayerElement: ReactElement = <p className={'active-player'}>Next player: {activePlayer}</p>;

  function changeActivePlayer(): void {
    console.log(changeActivePlayer.name);

    setIsXNextPlayer((isXNextPlayer: boolean): boolean => {
      return !isXNextPlayer;
    });
  }

  const [hasWon, setHasWon] = useState<boolean>(false);
  const winnerPlayerElement: ReactElement = <p className={'winner'}>Winner: {activePlayer}</p>;

  function squaresChange(squares: SquareList): void {
    console.log(squaresChange.name);

    addFeedItem();

    if (hasWonTheGame(squares)) {
      setHasWon(true);
    } else {
      turnDispatch('increment');
      changeActivePlayer();
    }
  }

  function hasWonTheGame(squares: SquareList): boolean {
    const winningMatrix: Set<WinningEntry> = new Set<WinningEntry>([
      // Lines
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal
      [0, 4, 8],
      [2, 4, 6],
    ]);

    return Array.from(winningMatrix.values()).some((entry: WinningEntry): boolean => {
      return (
        squares[entry[0]].marker === activePlayer &&
        squares[entry[1]].marker === activePlayer &&
        squares[entry[2]].marker === activePlayer
      );
    });
  }

  return (
    <div className={'game'}>
      <div className={'board-container'}>
        <Board activePlayer={activePlayer} onSquaresChange={squaresChange} hasWon={hasWon}></Board>
      </div>
      <div className={'information'}>
        {hasWon ? winnerPlayerElement : activePlayerElement}
        <Feed>{feedList}</Feed>
      </div>
    </div>
  );
}
