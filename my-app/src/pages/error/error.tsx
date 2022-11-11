import './error.scss';
import React from 'react';
import '../../components/translation/translation';
import { useTranslation, Trans } from 'react-i18next';
import TestComponent from 'components/testcomponent/testcomponent';

const lngs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russia' },
};

const Errorpage = () => {
  const { t, i18n } = useTranslation();

  console.log(Object.keys(lngs));
  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <button
          type="submit"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
        >
          {lngs[lng as keyof typeof lngs].nativeName}
        </button>
      ))}
      <p>
        <Trans i18nKey="description"></Trans>
      </p>
      {t('learn')}
      <div className="error">
        <div className="error__descr">The page was not found</div>
      </div>
      <TestComponent />;
    </>
  );
};

export default Errorpage;
