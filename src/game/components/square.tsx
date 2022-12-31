import './square.css';
import { PropsWithChildren, ReactNode, useState } from 'react';

type Props = PropsWithChildren;

type Marker = 'X' | 'O' | null;

export function Square(props: Props): ReactNode {
    const [marker, setMarker] = useState<Marker>(null);

    return (
        <p>{marker}</p>
    );
}