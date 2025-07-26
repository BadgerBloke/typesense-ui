import Image from 'next/image';

import { Button as ButtonPrimitive } from '~/components/ui/button';

const Button = ({ src, children, alt }: { src: string; children: React.ReactNode; alt: string }) => (
    <ButtonPrimitive type="submit" className="flex gap-2 h-fit w-full items-center justify-center cursor-pointer">
        <Image src={src} alt={alt} width={28} height={28} />
        {children}
    </ButtonPrimitive>
);

export default Button;
