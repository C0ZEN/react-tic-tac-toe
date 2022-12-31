import './square.scss';
import { PropsWithChildren, ReactElement, SyntheticEvent } from 'react';
import { ActivePlayer } from '../board/board';

export type Marker = ActivePlayer | null;

interface IProps extends PropsWithChildren {
  hasBorderBottom: boolean;
  hasBorderLeft: boolean;
  hasBorderRight: boolean;
  hasBorderTop: boolean;
  marker: Marker;
  onClick: (event: SyntheticEvent) => void;
}

export function Square(props: IProps): ReactElement {
  const isClickable: boolean = props.marker === null;

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

    if (isClickable) {
      classes.add('clickable');
    }

    return Array.from(classes.values()).join(' ');
  }

  function onClick(event: SyntheticEvent): void {
    event.stopPropagation();
    props.onClick(event);
  }

  return (
    <button className={getContainerClasses()} tabIndex={isClickable ? 0 : -1} onClick={onClick}>
      {props.marker}
    </button>
  );
}
