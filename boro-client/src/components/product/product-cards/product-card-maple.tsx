import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
// import PlusIcon from '@components/icons/plus-icon';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'src/app/i18n/client';
import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
  lang: string;
}
function RenderPopupOrAddToCart({
  props,
  lang,
}: {
  props: Object;
  lang: string;
}) {
  let { data }: any = props;
  const { t } = useTranslation(lang, 'common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="w-full grid grid-cols-[1fr,max-content] items-center bg-[#F4F6F8] rounded-[4px] mt-[10px] no-underline text-[15px] transition-all text-gray-600 hover:text-black font-medium"
        aria-label="Count Button"
      >
        <span className="flex items-center justify-center lg:hidden">
          {t('text-view')}
        </span>
        <span className="hidden lg:flex sm:items-center sm:justify-center">
          {t('text-variable-product')}
        </span>
        <span className="w-10 h-10 bg-[#E5E8EC] rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center ml-auto">
          <Eye width={iconSize} height={iconSize} opacity="1" />
        </span>
      </button>
    );
  }
  return <AddToCart data={data} variant="venus" lang={lang} />;
}
const ProductCardMaple: React.FC<ProductProps> = ({
  lang,
  product,
  className,
}) => {
  const { name, image, unit, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'USD',
  });

  const imageUrl = image ? `http://localhost:8080/${image}` : null;

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'grid group overflow-hidden cursor-pointer transition-all duration-300 relative h-full border border-[#EAEEF2] rounded p-[10px]  grid-cols-[150px,1fr] lg:grid-cols-[180px,1fr] xl:grid-cols-[160px,1fr]  2xl:grid-cols-[180px,1fr] gap-5 bg-white  hover:shadow-product-hover',
        className,
      )}
      onClick={handlePopupView}
      title={name}
    >
      <figure className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
        <Image
          src={imageUrl ?? productPlaceholder}
          alt={name || 'Product Image'}
          width={230}
          height={200}
          quality={100}
          className="object-cover bg-fill-thumbnail aspect-[230/200]"
        />
      </figure>

      <div className="flex flex-col py-[18px] md:py-3 pr-[5px] h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1">
          <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1 text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {name}
        </h2>
        <div className="mt-auto text-13px sm:text-sm">{unit}</div>
        <RenderPopupOrAddToCart props={{ data: product }} lang={lang} />
      </div>
    </article>
  );
};

export default ProductCardMaple;
