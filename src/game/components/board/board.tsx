import './board.scss';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { times } from 'lodash-es';
import { Marker, Square } from '../square/square';

type Props = PropsWithChildren;

interface ISquare {
  id: number;
  marker: Marker;
}

export function Board(props: Props): ReactElement {
  const [squares] = useState<ISquare[]>(
    times(9, (index: number): ISquare => {
      return {
        id: index,
        marker: null,
      };
    })
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
      ></Square>
    );
  });

  return <div className={'board'}>{squaresList}</div>;
}
