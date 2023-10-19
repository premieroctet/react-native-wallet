import { StyleProp, ViewStyle } from "react-native";

/**
 * @platform ios
 */
export enum ButtonStyle {
  /**
   * See https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle/black
   */
  BLACK = 0,
  /**
   * See https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle/blackoutline
   */
  BLACK_OUTLINE = 1,
}

/**
 * See https://developers.google.com/wallet/retail/loyalty-cards/resources/brand-guidelines#style
 * @platform android
 */
export enum ButtonType {
  PRIMARY = 0,
  CONDENSED = 1,
}

export type RNWalletViewProps = {
  /**
   * @platform ios
   *
   * @default ButtonStyle.BLACK
   */
  buttonStyle?: ButtonStyle;

  /**
   * @platform android
   *
   * @default ButtonType.PRIMARY
   */
  buttonType?: ButtonType;

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
};

export type RNWalletConstants = {
  buttonLayout?: {
    /**
     * Base button width. On Android, this value is undefined.
     */
    baseWidth?: number;
    /**
     * Base button height.
     */
    baseHeight: number;

    /**
     * Get the base width based on the Android button type
     * @param type Android button type
     * @returns number | undefined depending on the platform
     *
     * @platform android
     */
    baseWidthFromType: (type: ButtonType) => number | undefined;
  };
};
