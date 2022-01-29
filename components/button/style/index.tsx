import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { DerivativeToken, useStyleRegister, useToken, withPrefix } from '../../_util/theme';

// ============================== Shared ==============================
const genSharedButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  border: `${token.borderWidth}px ${token.borderStyle} transparent`,
  cursor: 'pointer',
  transition: `all ${token.duration} ${token.easeInOut}`,
  userSelect: 'none',
  touchAction: 'manipulation',
  lineHeight: token.lineHeight,
  color: token.textColor,

  '> span': {
    display: 'inline-block',
  },

  // Leave a space between icon and text.
  [`> .${iconPrefixCls} + span, > span + .${iconPrefixCls}`]: {
    marginInlineStart: token.marginXS,
  },

  [`&.${prefixCls}-block`]: {
    width: '100%',
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  minWidth: token.height,
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  borderRadius: token.height,
  paddingLeft: token.height / 2,
  paddingRight: token.height / 2,
  width: 'auto',
});

// =============================== Type ===============================
const genGhostButtonStyle = (
  prefixCls: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
): CSSObject => ({
  [`&.${prefixCls}-background-ghost`]: {
    color: textColor || undefined,
    backgroundColor: 'transparent',
    borderColor: borderColor || undefined,

    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined,
    },
  },
});

const genSolidDisabledButtonStyle = (token: DerivativeToken): CSSObject => ({
  '&:disabled': {
    cursor: 'not-allowed',
    borderColor: token.borderColor,
    color: token.textColorDisabled,
    backgroundColor: token.componentBackgroundDisabled,
    boxShadow: 'none',
  },
});

const genSolidButtonStyle = (token: DerivativeToken): CSSObject => ({
  borderRadius: token.borderRadius,

  ...genSolidDisabledButtonStyle(token),
});

const genPureDisabledButtonStyle = (token: DerivativeToken): CSSObject => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: token.textColorDisabled,
  },
});

// Type: Default
const genDefaultButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genSolidButtonStyle(token),

  backgroundColor: token.componentBackground,
  borderColor: token.borderColor,

  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',

  ...genGhostButtonStyle(
    prefixCls,
    token.componentBackground,
    token.componentBackground,
    token.textColorDisabled,
    token.borderColor,
  ),

  [`&.${prefixCls}-dangerous`]: {
    color: token.errorColor,
    borderColor: token.errorColor,

    ...genGhostButtonStyle(
      prefixCls,
      token.errorColor,
      token.errorColor,
      token.textColorDisabled,
      token.borderColor,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Primary
const genPrimaryButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genSolidButtonStyle(token),

  color: '#FFF',
  backgroundColor: token.primaryColor,

  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',

  ...genGhostButtonStyle(
    prefixCls,
    token.primaryColor,
    token.primaryColor,
    token.textColorDisabled,
    token.borderColor,
  ),

  [`&.${prefixCls}-dangerous`]: {
    backgroundColor: token.errorColor,

    ...genGhostButtonStyle(
      prefixCls,
      token.errorColor,
      token.errorColor,
      token.textColorDisabled,
      token.borderColor,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Dashed
const genDashedButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genDefaultButtonStyle(prefixCls, token),

  borderStyle: 'dashed',
});

// Type: Link
const genLinkButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  color: token.linkColor,
  ...genPureDisabledButtonStyle(token),

  [`&.${prefixCls}-dangerous`]: {
    color: token.errorColor,
    ...genPureDisabledButtonStyle(token),
  },
});

// Type: Text
const genTextButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genPureDisabledButtonStyle(token),

  [`&.${prefixCls}-dangerous`]: {
    color: token.errorColor,
    ...genPureDisabledButtonStyle(token),
  },
});

const genTypeButtonStyle = (prefixCls: string, token: DerivativeToken): CSSInterpolation => [
  withPrefix(genDefaultButtonStyle(prefixCls, token), `${prefixCls}-default`, []),
  withPrefix(genPrimaryButtonStyle(prefixCls, token), `${prefixCls}-primary`, []),
  withPrefix(genDashedButtonStyle(prefixCls, token), `${prefixCls}-dashed`, []),
  withPrefix(genLinkButtonStyle(prefixCls, token), `${prefixCls}-link`, []),
  withPrefix(genTextButtonStyle(prefixCls, token), `${prefixCls}-text`, []),
];

// =============================== Size ===============================
const genSizeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  sizePrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const paddingVertical = Math.max(
    0,
    (token.height - token.fontSize * token.lineHeight) / 2 - token.borderWidth,
  );
  const paddingHorizontal = token.padding - token.borderWidth;

  const iconOnlyCls = `.${prefixCls}-icon-only`;

  return [
    // Size
    withPrefix(
      {
        fontSize: token.fontSize,
        height: token.height,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,

        [`&${iconOnlyCls}`]: {
          width: token.height,
          paddingLeft: 0,
          paddingRight: 0,

          '> span': {
            transform: 'scale(1.143)', // 14px -> 16px
          },
        },

        // Loading
        [`&.${prefixCls}-loading`]: {
          opacity: 0.65,
          cursor: 'default',
        },

        [`.${prefixCls}-loading-icon`]: {
          transition: `width ${token.duration} ${token.easeInOut}, opacity ${token.duration} ${token.easeInOut}`,
        },

        [`&:not(${iconOnlyCls}) .${prefixCls}-loading-icon > .${iconPrefixCls}`]: {
          marginInlineEnd: token.marginXS,
        },
      },
      prefixCls,
      [sizePrefixCls],
    ),

    // Shape - patch prefixCls again to override solid border radius style
    withPrefix(genCircleButtonStyle(prefixCls, token), `${prefixCls}-circle`, [
      prefixCls,
      sizePrefixCls,
    ]),
    withPrefix(genRoundButtonStyle(prefixCls, token), `${prefixCls}-round`, [
      prefixCls,
      sizePrefixCls,
    ]),
  ];
};

const genSizeBaseButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => genSizeButtonStyle(prefixCls, iconPrefixCls, '', token);

const genSizeSmallButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    height: token.heightSM,
    padding: token.paddingXS,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-sm`, largeToken);
};

const genSizeLargeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    height: token.heightLG,
    fontSize: token.fontSizeLG,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-lg`, largeToken);
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, iconPrefixCls, hashId] = useToken();

  useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    // Shared
    withPrefix(genSharedButtonStyle(prefixCls, iconPrefixCls, token), prefixCls),

    // Size
    genSizeSmallButtonStyle(prefixCls, iconPrefixCls, token),
    genSizeBaseButtonStyle(prefixCls, iconPrefixCls, token),
    genSizeLargeButtonStyle(prefixCls, iconPrefixCls, token),

    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(prefixCls, token),
  ]);
}
