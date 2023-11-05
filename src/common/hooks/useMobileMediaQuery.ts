import { useMediaQuery } from "react-responsive"
import {IS_MOBILE} from '../constants/constants'

export function useMobileMediaQuery() {
  const isMobile = useMediaQuery({maxWidth: IS_MOBILE})
  return isMobile
}
