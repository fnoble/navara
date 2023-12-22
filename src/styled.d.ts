// import original module declarations
import 'styled-components';


// and extend them!
declare module 'styled-components' {
    interface DefaultTheme extends Styles.Theme {}
}