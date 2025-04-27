import { Section } from '@/components';
import { getCartItemsAction } from '@/components/cart/actions';
import { CartContent } from '@/components/cart/cart-content';
import { classNames, heightMinusHeader } from '@/constants/class-names';

export default async function CartPage() {
    const cart = await getCartItemsAction();

    return (
        <Section className={classNames.colors1}>
            <Section.Content
                className='flex flex-col h-screen'
                style={{ height: heightMinusHeader }}
            >
                <CartContent cart={cart} isFullCart />
            </Section.Content>
        </Section>
    );
}
