const STATUS = {
  DECLINED: 'declined',
  INACTIVE: 'in-active',
  ACTIVE: 'active',
  PENDING: 'pending',
  DELETED: 'deleted',
};

const ROLE = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  BOOKKEEPER: 'bookkeeper',
};

const EIN_APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NONE: 'none',
};

const COMPANY_TWO_FACTOR_AUTH_STATUS = {
  ENABLE: 'enable',
  DISABLE: 'disable',
};

const BILLING_METHOD = {
  USD: 'usd',
  BILLING: 'billing',
  USD_AND_BILLING: 'usd_and_billing',
};

export default {
  STATUS,
  ROLE,
  EIN_APPROVAL_STATUS,
  COMPANY_TWO_FACTOR_AUTH_STATUS,
  BILLING_METHOD,
};
