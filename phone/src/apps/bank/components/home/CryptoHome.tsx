import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useBankModal } from '../../hooks/useBankModal';
import { Button } from '@ui/components/Button';
import { useCredentials } from '../../hooks/useCredentials';

import useStyles from './home.styles';

export const CryptoHome = () => {
  const classes = useStyles();
  const credentials = useCredentials();
  const [t] = useTranslation();

  const { setShowBankModal } = useBankModal();

  const openTransactionsModal = () => {
    setShowBankModal(true);
  };

  if (!credentials) return <p>Could not load credentials</p>;

  return (
    <div className={classes.root}>
      <Typography className={classes.headTitle}>
        <span style={{ fontWeight: 'bold' }}>Crypto</span>
      </Typography>
      <div className={classes.accounts}>
        <h2 className={classes.accountsType}>Aurora Coin:</h2>
        <p className={classes.accountBalance}>{credentials.crypto}</p>
      </div>
      <div className={classes.actions}>
        <Button onClick={openTransactionsModal} className={classes.actionButton}>
          Transfer
        </Button>
      </div>
    </div>
  );
};
