import React, { useContext } from "react";
import tw from "twin.macro";
import { DocumentContext } from "~context/DocumentContext.jsx";
import Button from "~components/Button.jsx";
import Grid from "~components/styles/Grid.jsx";
import * as Icon from "~components/svg/Icons.jsx";
import * as Logo from "~components/svg/Logos.jsx";
import * as T from "~components/styles/Typography.jsx";

const Footer = () => {
  const { isDesktop } = useContext(DocumentContext);

  return (
    <>
      {(isDesktop() && (
        <footer className="footer w-full relative bg-white border-t border-b">
          <nav className="w-full flex items-stretch">
            <div className="w-1/5 pt-4 pl-5 pb-4 border-r">
              <Logo.Logomark styles={[tw`w-10`]} />
            </div>

            <Button
              styles={[tw`w-1/5 relative block px-4 border-r`]}
              text="Contact"
            />
            <Button
              styles={[tw`w-1/5 relative block px-4 border-r`]}
              text="T’S AND C’s"
            />
            <Button
              styles={[tw`w-1/5 relative block px-4 border-r`]}
              text="Facebook"
            />
            <Button
              styles={[tw`w-1/5 relative block px-4 border-r`]}
              text="Instagram"
            />
          </nav>
        </footer>
      )) || (
        <footer className="footer w-full relative bg-white">
          <Grid styles={[tw`border-t`]}>
            <div className="col-span-12 py-4 px-3">
              {/* <Logo.Logomark styles={[tw`w-12`]} /> */}
              <Logo.Wordmark styles={[tw`w-36`]} />
            </div>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <button
              type="button"
              tw="col-span-12 relative block pt-10 px-3 pb-10"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Home</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <button
              type="button"
              tw="col-span-12 relative block pt-4 px-3 pb-4"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Leggings</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <button
              type="button"
              tw="col-span-12 relative block pt-4 px-3 pb-4"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Shirt</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <button
              type="button"
              tw="col-span-12 relative block pt-4 px-3 pb-4"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Bra</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <button
              type="button"
              tw="col-span-12 relative block pt-4 px-3 pb-4"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Bag</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <button
              type="button"
              tw="col-span-6 relative block pt-4 pr-4 px-3 pb-4 border-r"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Contact</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>

            <button type="button" tw="col-span-6 relative block pt-4 px-3 pb-4">
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>T’S &amp; C’S</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </button>
          </Grid>

          <Grid styles={[tw`border-t`]}>
            <a
              href="https://www.facebook.com"
              rel="noopener noreferrer"
              target="_blank"
              tw="col-span-6 relative block pt-4 px-3 pb-4 border-r"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Facebook</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </a>

            <a
              href="https://www.instagram.com"
              rel="noopener noreferrer"
              target="_blank"
              tw="col-span-6 relative block pt-4 px-3 pb-4"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase`]}>Instagram</T.Button>
                <Icon.Arrow styles={[tw`h-3`]} />
              </div>
            </a>
          </Grid>

          <Grid styles={[tw`bg-black`]}>
            <a
              href="https://www.loveandmoney.agency/"
              rel="noopener noreferrer"
              target="_blank"
              tw="col-span-12 relative block pt-4 px-3 pb-4"
            >
              <div className="flex items-center justify-between">
                <T.Button styles={[tw`uppercase text-white`]}>
                  Made with Love + Money
                </T.Button>
                <Icon.Arrow color="white" styles={[tw`h-3`]} />
              </div>
            </a>
          </Grid>
        </footer>
      )}
    </>
  );
};

export default Footer;
