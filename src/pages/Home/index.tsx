import { FC } from 'react';

import { Feedback } from '@/components/features/Feedback';
import { Button } from '@/components/ui/button';

export const Home: FC = () => {
    return (
        <div>
            <section>
                <h1>title</h1>
                <p>description</p>
                <Button>button</Button>
            </section>

            <section>
                advantages
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </section>

            <section>
                how does it work
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </section>

            <section>
                <Button>button</Button>
                <p>try</p>
            </section>

            <section>
                <Feedback />
            </section>
        </div>
    );
};
