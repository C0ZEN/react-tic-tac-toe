import './feed.scss';
import { PropsWithChildren, ReactElement } from 'react';

type Props = PropsWithChildren;

export function Feed(props: Props): ReactElement {
  return <div className={'feed'}>{props.children}</div>;
}
