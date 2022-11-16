import { Trans, useTranslation } from 'react-i18next';

// TODO: remove after example create

function TestComponent(): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <>
      <p>
        <Trans i18nKey="description"></Trans>
      </p>
    </>
  );
}

export default TestComponent;
