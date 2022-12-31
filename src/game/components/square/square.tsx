import './square.scss';
import { PropsWithChildren, ReactElement } from 'react';

export type Marker = 'X' | 'O' | null;

interface IProps extends PropsWithChildren {
  hasBorderBottom: boolean;
  hasBorderLeft: boolean;
  hasBorderRight: boolean;
  hasBorderTop: boolean;
  marker: Marker;
}

export function Square(props: IProps): ReactElement {
  function getContainerClasses(): string {
    const classes: Set<string> = new Set<string>(['square']);

    if (props.hasBorderTop) {
      classes.add('border-top');
    }

    if (props.hasBorderRight) {
      classes.add('border-right');
    }

    if (props.hasBorderBottom) {
      classes.add('border-bottom');
    }

    if (props.hasBorderLeft) {
      classes.add('border-left');
    }

    return Array.from(classes.values()).join(' ');
  }

  return (
    <div className={getContainerClasses()}>
      <p>{props.marker}</p>
    </div>
  );
}
