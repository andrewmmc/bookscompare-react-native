import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
import { config } from '../config';

const GATracker = new GoogleAnalyticsTracker(config.googleAnalytics);
// GoogleAnalyticsSettings.setDryRun(true);

export { GATracker };
