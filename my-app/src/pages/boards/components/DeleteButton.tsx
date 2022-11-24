import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function DeleteButton(handleToggleModal: () => void): JSX.Element {
  const { t } = useTranslation();
  return (
    <Button onClick={handleToggleModal} fullWidth variant="contained" color="secondary" sx={{ marginBottom: '10px' }}>
      {t('boards.delete')}
    </Button>
  );
}

export default DeleteButton;