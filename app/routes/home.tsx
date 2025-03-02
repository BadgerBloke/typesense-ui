import { Welcome } from '~/client/welcome/welcome';

export function meta() {
    return [{ title: 'Typesense UI | Developed by MKSingh' }, { name: 'description', content: 'Typesense UI/Console | Developed by MKSingh' }];
}

export default function Home() {
    return <Welcome />;
}
