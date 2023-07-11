import CodeService from './CodeService/CodeService';
import StrongService from './StrongService/StrongService';
import SubscriptService from './SubscriptService/SubscriptService';
import SuperscriptService from './SuperscriptService/SuperscriptService';
import StrikeThroughService from './StrikeThroughService/StrikeThroughService';
import UnderlineService from './UnderlineService/UnderlineService';
import SmallCapsService from './SmallCapsService/SmallCapsService';

import EmphasisService from './EmphasisService/EmphasisService';
import RefferenceTaggingService from './RefferenceTaggingService/RefferenceTaggingService';
import './style.css';

export default [
  new CodeService(),
  
  new UnderlineService(),
  new StrongService(),
  new EmphasisService(),

  new SubscriptService(),
  new SuperscriptService(),
  new StrikeThroughService(),
  new SmallCapsService(),
  new RefferenceTaggingService(),
];
