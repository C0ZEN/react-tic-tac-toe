import './game.scss';
import { ReactElement } from 'react';
import { Board } from './components/board/board';

export function Game(): ReactElement {
  return (
    <div className={'game'}>
      <Board></Board>
    </div>
  );
}
