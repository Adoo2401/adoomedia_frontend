import {Typography,useTheme} from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdWidget=()=>{
      
      const {palette} = useTheme();
      const dark=palette.neutral.dark;
      const main=palette.neutral.main;
      const medium=palette.neutral.medium;

      return(
         <WidgetWrapper>

             <FlexBetween>
                  <Typography color={dark} variant="h5" fontWeight="500">Sponsored</Typography>
                  <Typography color={medium}>Create Ad</Typography>
             </FlexBetween>

             <img src="./pmv-chamara-dMjkQJs58uo-unsplash.jpg" width="100%" height={"auto"} alt="ad" style={{borderRadius:"0.75rem",margin:"0.75rem 0"}}/>

             <FlexBetween>
                 <Typography color={main}>AdooCosmetics</Typography>
                 <Typography color={medium}>adoocosmetics.com</Typography>
             </FlexBetween>

             <Typography color={medium} m="0.5rem 0">
                 Your pathway to stunning and immaculate beauty
             </Typography>

         </WidgetWrapper>
      )

}

export default AdWidget