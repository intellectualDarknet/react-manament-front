import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function DeleteButton(handleToggleModal: () => void): JSX.Element {
  const { t } = useTranslation();
  return (
    <Button
      onClick={handleToggleModal}
      fullWidth
      variant="contained"
      color="secondary"
      sx={{ m: '10px', borderRadius: '32px' }}
    >
      {t('boards.delete')}
    </Button>
  );
}

export default DeleteButton;
