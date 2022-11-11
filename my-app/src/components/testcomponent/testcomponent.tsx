import { Trans, useTranslation } from 'react-i18next';

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
