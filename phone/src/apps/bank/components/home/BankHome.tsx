import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useCredentials } from '../../hooks/useCredentials';

import useStyles from './home.styles';

export const BankHome = () => {
  const classes = useStyles();
  const credentials = useCredentials();
  const [t] = useTranslation();

  if (!credentials) return <p>Could not load credentials</p>;

  return (
    <div className={classes.root}>
      <Typography className={classes.headTitle}>
        <span style={{ fontWeight: 'bold' }}>{t('APPS_BANK_HOME_TITLE')}</span>, {credentials.name}
      </Typography>
      <div className={classes.accounts}>
        <h2 className={classes.accountsType}>Savings:</h2>
        <p className={classes.accountBalance}>{credentials.balance}</p>
      </div>
    </div>
  );
};
