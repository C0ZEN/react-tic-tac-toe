import './board.scss';
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { times } from 'lodash-es';
import { Marker, Square } from '../square/square';

export type ActivePlayer = 'X' | 'O';

interface IProps extends PropsWithChildren {
  activePlayer: ActivePlayer;
  hasWon: boolean;
  onSquaresChange: (squares: SquareList) => void;
}

export interface ISquare {
  id: number;
  marker: Marker;
}

export type SquareList = [ISquare, ISquare, ISquare, ISquare, ISquare, ISquare, ISquare, ISquare, ISquare];

export function Board({ activePlayer, hasWon, onSquaresChange }: IProps): ReactElement {
  function squareClick(clickedSquare: ISquare): void {
    console.log(squareClick.name);

    setSquares((squares: SquareList): SquareList => {
      return squares.map((square: ISquare): ISquare => {
        if (square.id === clickedSquare.id) {
          return {
            ...clickedSquare,
            marker: activePlayer,
          };
        }

        return square;
      }) as SquareList;
    });
  }

  const [squares, setSquares] = useState<SquareList>(
    times(9, (index: number): ISquare => {
      return {
        id: index,
        marker: null,
      };
    }) as SquareList
  );
  const squaresList: ReactElement[] = squares.map((square: ISquare, index: number): ReactElement => {
    const isLastRow: boolean = index >= 6;
    const isLastColumn: boolean = [2, 5, 8].includes(index);

    return (
      <Square
        key={square.id}
        hasBorderTop
        hasBorderRight={isLastColumn}
        hasBorderBottom={isLastRow}
        hasBorderLeft
        marker={square.marker}
        isDisabled={hasWon}
        onClick={() => squareClick(square)}
      ></Square>
    );
  });

  function isBoardEmpty(): boolean {
    return squares.every((square: ISquare): boolean => {
      return square.marker === null;
    });
  }

  useEffect((): void => {
    if (!isBoardEmpty()) {
      onSquaresChange(squares);
    }
    // eslint-disable-next-line
  }, [squares]);

  return <div className={'board'}>{squaresList}</div>;
}
