import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import tw, { css } from "twin.macro";
import Glide from "@glidejs/glide";
import { DocumentContext } from "~context/DocumentContext";

const Carousel = ({
  autoPlay,
  gap,
  items,
  keyPrefix,
  onUpdate,
  peek,
  styles
}) => {
  const { windowWidth } = useContext(DocumentContext);

  const glideRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0);
  const [glide, setGlide] = useState(null);

  //

  useEffect(() => {
    if (!glideRef?.current || glide) {
      return;
    }

    const glideCarousel = new Glide(`#${keyPrefix}-glide`, {
      autoPlay: autoPlay <= 0 ? false : autoPlay,
      bound: true,
      gap,
      hoverpause: true,
      peek,
      perView: 1,
      rewind: false,
      type: `slider`
    });

    glideCarousel.on(`run`, () => {
      setActiveIndex(glideCarousel.index);

      onUpdate(glideCarousel.index);
    });

    glideCarousel.mount();

    setGlide(glideCarousel);
  }, [glideRef, windowWidth]);

  //

  return (
    <article key={`${keyPrefix}-container`} css={styles}>
      <div
        id={`${keyPrefix}-glide`}
        ref={glideRef}
        className="glide"
        tw="w-full h-full relative"
      >
        <div
          className="glide__track"
          data-glide-el="track"
          tw="w-full h-full relative"
        >
          <ul className="glide__slides" tw="w-full h-full relative">
            {items.map((itemJSX, itemIndex) => {
              const key = `${keyPrefix}-item-${itemIndex}`;

              return (
                <li
                  key={key}
                  className="glide__slide"
                  tw="w-full h-full relative"
                >
                  {itemJSX}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};

Carousel.defaultProps = {
  autoPlay: 0,
  gap: 0,
  keyPrefix: `glide-carousel`,
  onUpdate: () => {},
  peek: 0,
  styles: []
};

Carousel.propTypes = {
  autoPlay: PropTypes.number,
  gap: PropTypes.number,
  items: PropTypes.node.isRequired,
  keyPrefix: PropTypes.string,
  onUpdate: PropTypes.func,
  peek: PropTypes.number,
  styles: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Carousel;
