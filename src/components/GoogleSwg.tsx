import { config } from "@/config";
import Script from "next/script";

export const GoogleSwg = () => {
  return (
    <>
      <Script
        src="https://news.google.com/swg/js/v1/swg-basic.js"
        strategy="afterInteractive"
      />
      <Script id="swg-basic-init" strategy="afterInteractive">
        {`(self.SWG_BASIC = self.SWG_BASIC || []).push(function (basicSubscriptions) {
  basicSubscriptions.init({
    type: "NewsArticle",
    isPartOfType: ["Product"],
    isPartOfProductId: "${config.swgProductId}",
    clientOptions: { theme: "light", lang: "en" },
  });
});`}
      </Script>
    </>
  );
};
