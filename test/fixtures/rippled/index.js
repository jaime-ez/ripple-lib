'use strict';

module.exports = {
  submit: {
    success: require('./submit'),
    failure: require('./submit-failed')
  },
  ledger: {
    normal: require('./ledger'),
    notFound: require('./ledger-not-found'),
    withoutCloseTime: require('./ledger-without-close-time'),
    withSettingsTx: require('./ledger-with-settings-tx'),
    withStateAsHashes: require('./ledger-with-state-as-hashes')
  },
  subscribe: require('./subscribe'),
  unsubscribe: require('./unsubscribe'),
  account_info: {
    normal: require('./account-info'),
    notfound: require('./account-info-not-found')
  },
  account_offers: require('./account-offers'),
  account_tx: {
    normal: require('./account-tx'),
    one: require('./get-transactions-one')
  },
  gateway_balances: require('./gateway-balances'),
  book_offers: {
    fabric: require('./book-offers'),
    usd_xrp: require('./book-offers-usd-xrp'),
    xrp_usd: require('./book-offers-xrp-usd')
  },
  server_info: {
    normal: require('./server-info'),
    error: require('./server-info-error')
  },
  path_find: {
    generate: require('./path-find'),
    sendUSD: require('./path-find-send-usd'),
    sendAll: require('./path-find-send-all'),
    XrpToXrp: require('./path-find-xrp-to-xrp'),
    srcActNotFound: require('./path-find-srcActNotFound')
  },
  tx: {
    Payment: require('./tx/payment.json'),
    AccountSet: require('./tx/account-set.json'),
    AccountSetTrackingOn: require('./tx/account-set-tracking-on.json'),
    AccountSetTrackingOff: require('./tx/account-set-tracking-off.json'),
    RegularKey: require('./tx/set-regular-key.json'),
    OfferCreate: require('./tx/offer-create.json'),
    OfferCreateSell: require('./tx/offer-create-sell.json'),
    OfferCancel: require('./tx/offer-cancel.json'),
    TrustSet: require('./tx/trust-set.json'),
    TrustSetFrozenOff: require('./tx/trust-set-frozen-off.json'),
    TrustSetNoQuality: require('./tx/trust-set-no-quality.json'),
    NotFound: require('./tx/not-found.json'),
    NoLedgerIndex: require('./tx/no-ledger-index.json'),
    NoLedgerFound: require('./tx/no-ledger-found.json'),
    LedgerWithoutTime: require('./tx/ledger-without-time.json'),
    NotValidated: require('./tx/not-validated.json'),
    OfferWithExpiration: require('./tx/order-with-expiration.json'),
    SuspendedPaymentCreation: require('./tx/suspended-payment-creation.json'),
    SuspendedPaymentCreationIOU:
      require('./tx/suspended-payment-creation-iou.json'),
    SuspendedPaymentCancellation:
      require('./tx/suspended-payment-cancellation.json'),
    SuspendedPaymentExecution: require('./tx/suspended-payment-execution.json'),
    SuspendedPaymentExecutionSimple:
      require('./tx/suspended-payment-execution-simple.json'),
    Unrecognized: require('./tx/unrecognized.json'),
    NoMeta: require('./tx/no-meta.json'),
    LedgerZero: require('./tx/ledger-zero.json')
  }
};
