//
//  ButtonStyle.swift
//  RNWallet
//
//  Created by Hugo FOYART on 16/10/2023.
//

import PassKit
import ExpoModulesCore

enum ButtonStyle: Int, Enumerable {
    case black = 0
    case blackOutline = 1
    
    func toPkAddPassButtonStyle() -> PKAddPassButtonStyle {
        switch self {
        case .black:
            return .black
        case .blackOutline:
            return .blackOutline
        }
    }
}
