declare module 'react-pageflip' {
  import * as React from 'react';

  export interface IFlipSetting {
    startPage?: number;
    size?: 'fixed' | 'stretch';
    width?: number;
    height?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    renderOnlyPageLengthChange?: boolean;
  }

  export interface IFlipEvent {
    data: number;
    object?: unknown;
  }

  export interface HTMLFlipBookProps extends IFlipSetting {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    onFlip?: (flipEvent: IFlipEvent) => void;
    onChangeOrientation?: (flipEvent: IFlipEvent) => void;
    onChangeState?: (flipEvent: IFlipEvent) => void;
    onInit?: (flipEvent: IFlipEvent) => void;
  }

  export interface IPageFlip {
    getPageCount(): number;
    getCurrentPageIndex(): number;
    turnToPage(page: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    destroy(): void;
  }

  export interface PageFlipRef {
    pageFlip(): IPageFlip;
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<
    HTMLFlipBookProps & React.RefAttributes<PageFlipRef>
  >;

  export default HTMLFlipBook;
}
