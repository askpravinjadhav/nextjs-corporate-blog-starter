export const GoogleSubscribeButton = ({
  label = "Subscribe",
}: {
  label?: string;
}) => {
  return (
    <button
      type="button"
      swg-standard-button="subscription"
      className="swg-standard-button-labeled inline-flex min-h-11 items-center justify-center border border-neutral-200 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] hover:border-black"
    >
      {label}
    </button>
  );
};
