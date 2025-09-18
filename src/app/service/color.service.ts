import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  private extractOklchValues(oklchString: string): { l: number, c: number, h: number } | null {
    const matches = oklchString.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
    if (matches && matches.length === 4) {
      return {
        l: parseFloat(matches[1]),
        c: parseFloat(matches[2]),
        h: parseFloat(matches[3])
      };
    }
    return null;
  }

  private oklchToHex(l: number, c: number, h: number): string {
    const hRadians = h * Math.PI / 180;
    const a = c * Math.cos(hRadians);
    const b = c * Math.sin(hRadians);

    // Convert OKLAB to linear RGB
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

    const l_cubed = l_ ** 3;
    const m_cubed = m_ ** 3;
    const s_cubed = s_ ** 3;

    // Convert to linear RGB
    const r = 4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed;
    const g = -1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed;
    const ba = -0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.7076147010 * s_cubed;

    // Clamp and convert to sRGB
    const toGamma = (x: number) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    };

    const r_gamma = Math.round(toGamma(r) * 255);
    const g_gamma = Math.round(toGamma(g) * 255);
    const b_gamma = Math.round(toGamma(ba) * 255);

    // Convert to hex
    return `#${r_gamma.toString(16).padStart(2, '0')}${g_gamma.toString(16).padStart(2, '0')}${b_gamma.toString(16).padStart(2, '0')}`;
  }


  rgbToHex(rgb: string): string {
    const rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!rgbArray) {
      return rgb;
    }

    const hex = (x: string) => {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    };

    return "#" + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
  }

  getColorCodes(dataset: string[]): string[] {
    const hashColorCodes: string[] = [];

    dataset.forEach((className: string) => {
      const element = document.querySelector(`.${className}`);
      let backgroundColor;

      if (element) {
        backgroundColor = window.getComputedStyle(element).backgroundColor;
      } else {
        const divElement = document.createElement('div');
        divElement.className = className;
        divElement.style.visibility = 'hidden';
        document.body.appendChild(divElement);

        const styles = window.getComputedStyle(divElement);
        backgroundColor = styles.backgroundColor;

        document.body.removeChild(divElement);
      }

      try {
        const oklchValues = this.extractOklchValues(backgroundColor);
        const hexColor = oklchValues ? this.oklchToHex(oklchValues.l, oklchValues.c, oklchValues.h) : backgroundColor;
        hashColorCodes.push(hexColor);
      } catch (error) {
        hashColorCodes.push(backgroundColor);
      }
    });

    return hashColorCodes;
  }
}
