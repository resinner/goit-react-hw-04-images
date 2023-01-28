import { MagnifyingGlass } from 'react-loader-spinner';

import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.Loader}>
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  </div>
);

// class Loader extends Component {
//   render() {
//     return (
//       <div className={styles.Loader}>
//         <Template type="TailSpin" color="#02be6e" height={100} width={100} />
//       </div>
//     );
//   }
// }

export default Loader;
