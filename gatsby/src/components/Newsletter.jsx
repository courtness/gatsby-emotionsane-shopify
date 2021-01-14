/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { useContext, useRef, useState } from "react";
import tw, { css, theme } from "twin.macro";
import Img from "gatsby-image";
import { DocumentContext } from "~context/DocumentContext.jsx";
import Button from "~components/Button.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as T from "~components/styles/Typography.jsx";

const Newsletter = ({ background, backgroundXS, content, heading }) => {
  const { isDesktop } = useContext(DocumentContext);

  const submitRef = useRef();

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //

  const submitProxy = () => {
    if (submitRef?.current) {
      submitRef.current.click();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      typeof window !== `undefined` &&
      window.location.href.includes(`localhost:8000`)
    ) {
      setSubmitting(true);

      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 3000);

      return false;
    }

    if (submitting || submitted) {
      return false;
    }

    setSubmitting(true);

    // const formData = new FormData(e.target);

    // fetch ...

    return false;
  };

  //

  let { fluid } = background.asset;

  if (!isDesktop()) {
    ({ fluid } = backgroundXS.asset);
  }

  return (
    <section tw="w-full relative">
      <figure tw="w-full h-full relative flex items-center justify-center">
        <Img
          tw="w-full h-full object-cover"
          fluid={fluid}
          alt={background.altText}
        />
      </figure>

      <div tw="w-full h-full absolute top-0 right-0 bottom-0 left-0 z-10">
        <Grid styles={[tw`h-full`]}>
          <article tw="col-span-12 md:col-span-6 h-full relative flex flex-col justify-end border-r">
            <T.Heading font="4" level="3" styles={[tw`mb-4 px-4`]}>
              {heading}
            </T.Heading>

            <T.Body font="1" styles={[tw`mb-6 px-4`]}>
              {content}
            </T.Body>

            <form onSubmit={onSubmit}>
              <input ref={submitRef} type="hidden" />

              <input
                css={[
                  css`
                    ${T.Style(`b2`)}

                    &::-webkit-input-placeholder {
                      color: ${theme`colors.black`};
                    }
                    &::-moz-placeholder {
                      color: ${theme`colors.black`};
                    }
                    &:-ms-input-placeholder {
                      color: ${theme`colors.black`};
                    }
                    &:-moz-placeholder {
                      color: ${theme`colors.black`};
                    }
                  `,
                  tw`w-full h-12 relative block px-4 bg-white border-t`
                ]}
                placeholder="Full name*"
                required
                type="text"
              />

              <input
                css={[
                  css`
                    ${T.Style(`b2`)}

                    &::-webkit-input-placeholder {
                      color: ${theme`colors.black`};
                    }
                    &::-moz-placeholder {
                      color: ${theme`colors.black`};
                    }
                    &:-ms-input-placeholder {
                      color: ${theme`colors.black`};
                    }
                    &:-moz-placeholder {
                      color: ${theme`colors.black`};
                    }
                  `,
                  tw`w-full h-12 relative block px-4 bg-white border-t border-b`
                ]}
                placeholder="Email*"
                required
                type="email"
              />

              <Button
                disabled
                onClick={submitProxy}
                styles={[tw`w-full h-12 relative px-4`]}
                text="Submit"
              />
            </form>
          </article>
        </Grid>
      </div>
    </section>
  );
};

export default Newsletter;
