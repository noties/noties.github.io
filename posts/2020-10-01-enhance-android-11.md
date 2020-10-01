---
title: Android 11 API changes
---

This is a _raw_ changelog for the Android 11 API created with the [Enhance] library.

* `Build.VERSION_CODES` still appends new versions as letters, so now we have `R`, which is API level `30`, which is Android `11`, which is very confusing
* `Activity` and `View` still growing strong 💪
* `AsyncTask` and `IntentService` are deprecated, good bye old friends
* 24 entries added and deprecated within the same `R,30,11` (search for the `-+`)

[Enhance]: https://github.com/noties/Enhance

<br>
<p $excerpt></p>

<blockquote class="custom tip">
<h3>How to read signatures</h3>

* `-` - deprecated
* `+` - added
* `-+` - added and deprecated within the same API level

<br>

* `Z` => boolean
* `B` => byte
* `C` => char
* `S` => short
* `I` => int
* `J` => long
* `F` => float
* `D` => double
* `V` => void
* `L` + class name + `;` => class (package and parent class are omitted)
* `[` + any type from this list => array of type (multidimensional array of ints: `[[I`)
</blockquote>

```diff
android/Manifest$permission
-   BIND_CHOOSER_TARGET_SERVICE
+   BIND_CONTROLS
+   BIND_QUICK_ACCESS_WALLET_SERVICE
+   INTERACT_ACROSS_PROFILES
+   LOADER_USAGE_STATS
+   MANAGE_EXTERNAL_STORAGE
+   NFC_PREFERRED_PAYMENT_INFO
+   QUERY_ALL_PACKAGES
+   READ_PRECISE_PHONE_STATE
```

```diff
android/R$attr
+   allowNativeHeapPointerTagging
+   animatedImageDrawable
-   anyDensity
+   autoRevokePermissions
+   canTakeScreenshot
+   crossProfile
+   forceQueryable
+   gwpAsanMode
+   htmlDescription
+   importantForContentCapture
+   mimeGroup
+   preferMinimalPostProcessing
+   preserveLegacyExternalStorage
+   resourcesMap
+   supportsInlineSuggestions
-   windowOverscan
-   windowSwipeToDismiss
```


```diff
android/R$id
+   accessibilityActionImeEnter
+   accessibilityActionPressAndHold
+   accessibilitySystemActionBack
+   accessibilitySystemActionHome
+   accessibilitySystemActionLockScreen
+   accessibilitySystemActionNotifications
+   accessibilitySystemActionPowerDialog
+   accessibilitySystemActionQuickSettings
+   accessibilitySystemActionRecents
+   accessibilitySystemActionTakeScreenshot
+   accessibilitySystemActionToggleSplitScreen
```


```diff
android/R$string
-   no
-   yes
```


```diff
android/R$style
-   Theme_Material_Light_NoActionBar_Overscan
-   Theme_Material_NoActionBar_Overscan
```


```diff
+android/accessibilityservice/AccessibilityGestureEvent
```


```diff
android/accessibilityservice/AccessibilityService
+   ERROR_TAKE_SCREENSHOT_INTERNAL_ERROR
+   ERROR_TAKE_SCREENSHOT_INTERVAL_TIME_SHORT
+   ERROR_TAKE_SCREENSHOT_INVALID_DISPLAY
+   ERROR_TAKE_SCREENSHOT_NO_ACCESSIBILITY_ACCESS
+   GESTURE_2_FINGER_DOUBLE_TAP
+   GESTURE_2_FINGER_DOUBLE_TAP_AND_HOLD
+   GESTURE_2_FINGER_SINGLE_TAP
+   GESTURE_2_FINGER_SWIPE_DOWN
+   GESTURE_2_FINGER_SWIPE_LEFT
+   GESTURE_2_FINGER_SWIPE_RIGHT
+   GESTURE_2_FINGER_SWIPE_UP
+   GESTURE_2_FINGER_TRIPLE_TAP
+   GESTURE_3_FINGER_DOUBLE_TAP
+   GESTURE_3_FINGER_DOUBLE_TAP_AND_HOLD
+   GESTURE_3_FINGER_SINGLE_TAP
+   GESTURE_3_FINGER_SWIPE_DOWN
+   GESTURE_3_FINGER_SWIPE_LEFT
+   GESTURE_3_FINGER_SWIPE_RIGHT
+   GESTURE_3_FINGER_SWIPE_UP
+   GESTURE_3_FINGER_TRIPLE_TAP
+   GESTURE_4_FINGER_DOUBLE_TAP
+   GESTURE_4_FINGER_DOUBLE_TAP_AND_HOLD
+   GESTURE_4_FINGER_SINGLE_TAP
+   GESTURE_4_FINGER_SWIPE_DOWN
+   GESTURE_4_FINGER_SWIPE_LEFT
+   GESTURE_4_FINGER_SWIPE_RIGHT
+   GESTURE_4_FINGER_SWIPE_UP
+   GESTURE_4_FINGER_TRIPLE_TAP
+   GESTURE_DOUBLE_TAP
+   GESTURE_DOUBLE_TAP_AND_HOLD
+   getAccessibilityButtonController(I)LAccessibilityButtonController;
+   getSystemActions()LList;
+   getWindowsOnAllDisplays()LSparseArray;
-   onGesture(I)Z
+   onGesture(LAccessibilityGestureEvent;)Z
+   onSystemActionsChanged()V
+   setGestureDetectionPassthroughRegion(ILRegion;)V
+   setTouchExplorationPassthroughRegion(ILRegion;)V
+   takeScreenshot(ILExecutor;LTakeScreenshotCallback;)V
```


```diff
+android/accessibilityservice/AccessibilityService$ScreenshotResult
```


```diff
android/accessibilityservice/AccessibilityService$SoftKeyboardController
+   switchToInputMethod(LString;)Z
```


```diff
+android/accessibilityservice/AccessibilityService$TakeScreenshotCallback
```


```diff
android/accessibilityservice/AccessibilityServiceInfo
+   CAPABILITY_CAN_TAKE_SCREENSHOT
+   FLAG_REQUEST_MULTI_FINGER_GESTURES
+   FLAG_SERVICE_HANDLES_DOUBLE_TAP
```


```diff
android/accessibilityservice/GestureDescription
+   getDisplayId()I
```


```diff
android/accessibilityservice/GestureDescription$Builder
+   setDisplayId(I)LBuilder;
```


```diff
-android/accounts/AccountAuthenticatorActivity
-   <init>()V
-   setAccountAuthenticatorResult(LBundle;)V
```


```diff
android/app/Activity
-   finishActivityFromChild(LActivity;I)V
-   finishFromChild(LActivity;)V
-   navigateUpToFromChild(LActivity;LIntent;)Z
-   onNavigateUpFromChild(LActivity;)Z
+   onPictureInPictureRequested()Z
+   setLocusContext(LLocusId;LBundle;)V
+   setTranslucent(Z)Z
-   startActivityFromChild(LActivity;LIntent;I)V
-   startActivityFromChild(LActivity;LIntent;ILBundle;)V
-   startIntentSenderFromChild(LActivity;LIntentSender;ILIntent;III)V
-   startIntentSenderFromChild(LActivity;LIntentSender;ILIntent;IIILBundle;)V
```


```diff
android/app/ActivityManager
+   appNotResponding(LString;)V
+   getHistoricalProcessExitReasons(LString;II)LList;
+   isLowMemoryKillReportSupported()Z
+   setProcessStateSummary([B)V
```


```diff
android/app/ActivityManager$TaskDescription
-   getIcon()LBitmap;
```


```diff
-android/app/AliasActivity
-   <init>()V
```


```diff
android/app/AppOpsManager
-   checkPackage(ILString;)V
-   finishOp(LString;ILString;)V
+   finishOp(LString;ILString;LString;)V
+   isOpActive(LString;ILString;)Z
-   noteOp(LString;ILString;)I
+   noteOp(LString;ILString;LString;LString;)I
-   noteOpNoThrow(LString;ILString;)I
+   noteOpNoThrow(LString;ILString;LString;LString;)I
-   noteProxyOp(LString;LString;)I
+   noteProxyOp(LString;LString;ILString;LString;)I
-   noteProxyOpNoThrow(LString;LString;)I
-   noteProxyOpNoThrow(LString;LString;I)I
+   noteProxyOpNoThrow(LString;LString;ILString;LString;)I
+   setOnOpNotedCallback(LExecutor;LOnOpNotedCallback;)V
-   startOp(LString;ILString;)I
+   startOp(LString;ILString;LString;LString;)I
-   startOpNoThrow(LString;ILString;)I
+   startOpNoThrow(LString;ILString;LString;LString;)I
+   startWatchingActive([LString;LExecutor;LOnOpActiveChangedListener;)V
+   stopWatchingActive(LOnOpActiveChangedListener;)V
```


```diff
+android/app/AppOpsManager$OnOpActiveChangedListener
```


```diff
+android/app/AppOpsManager$OnOpNotedCallback
```


```diff
+android/app/ApplicationExitInfo
```


```diff
+android/app/AsyncNotedAppOp
```


```diff
-android/app/ExpandableListActivity
-   <init>()V
-   getExpandableListAdapter()LExpandableListAdapter;
-   getExpandableListView()LExpandableListView;
-   getSelectedId()J
-   getSelectedPosition()J
-   setListAdapter(LExpandableListAdapter;)V
-   setSelectedChild(IIZ)Z
-   setSelectedGroup(I)V
```


```diff
android/app/Instrumentation
+   callActivityOnPictureInPictureRequested(LActivity;)V
```


```diff
-android/app/IntentService
-   <init>(LString;)V
-   onHandleIntent(LIntent;)V
-   setIntentRedelivery(Z)V
```


```diff
-android/app/LauncherActivity
-   <init>()V
-   getTargetIntent()LIntent;
-   intentForPosition(I)LIntent;
-   itemForPosition(I)LListItem;
-   makeListItems()LList;
-   onQueryPackageManager(LIntent;)LList;
-   onSetContentView()V
```


```diff
-android/app/LauncherActivity$IconResizer
-   <init>(LLauncherActivity;)V
-   createIconThumbnail(LDrawable;)LDrawable;
```


```diff
-android/app/LauncherActivity$ListItem
-   className
-   extras
-   icon
-   label
-   packageName
-   resolveInfo
-   <init>()V
```


```diff
-android/app/ListActivity
-   <init>()V
-   getListAdapter()LListAdapter;
-   getListView()LListView;
-   getSelectedItemId()J
-   getSelectedItemPosition()I
-   onListItemClick(LListView;LView;IJ)V
-   setListAdapter(LListAdapter;)V
-   setSelection(I)V
```


```diff
android/app/Notification
+   findRemoteInputActionPair(Z)LPair;
+   getContextualActions()LList;
```


```diff
android/app/Notification$BubbleMetadata
+   getShortcutId()LString;
```


```diff
android/app/Notification$BubbleMetadata$Builder
-   <init>()V
+   <init>(LPendingIntent;LIcon;)V
+   <init>(LString;)V
```


```diff
android/app/Notification$Builder
+   setFlag(IZ)LBuilder;
```


```diff
android/app/Notification$MessagingStyle$Message
+   getMessagesFromBundleArray([LParcelable;)LList;
```


```diff
android/app/NotificationChannel
+   getConversationId()LString;
+   getParentChannelId()LString;
+   hasUserSetSound()Z
+   isImportantConversation()Z
+   setConversationId(LString;LString;)V
```


```diff
android/app/NotificationManager
+   ACTION_AUTOMATIC_ZEN_RULE_STATUS_CHANGED
+   AUTOMATIC_RULE_STATUS_DISABLED
+   AUTOMATIC_RULE_STATUS_ENABLED
+   AUTOMATIC_RULE_STATUS_REMOVED
+   AUTOMATIC_RULE_STATUS_UNKNOWN
+   EXTRA_AUTOMATIC_ZEN_RULE_ID
+   EXTRA_AUTOMATIC_ZEN_RULE_STATUS
+   cancelAsPackage(LString;LString;I)V
+   getConsolidatedNotificationPolicy()LPolicy;
+   getNotificationChannel(LString;LString;)LNotificationChannel;
```


```diff
android/app/NotificationManager$Policy
+   CONVERSATION_SENDERS_ANYONE
+   CONVERSATION_SENDERS_IMPORTANT
+   CONVERSATION_SENDERS_NONE
+   PRIORITY_CATEGORY_CONVERSATIONS
+   priorityConversationSenders
+   <init>(IIIII)V
```


```diff
+android/app/SyncNotedAppOp
```


```diff
android/app/UiAutomation
+   getWindowsOnAllDisplays()LSparseArray;
```


```diff
android/app/UiModeManager
+   MODE_NIGHT_CUSTOM
+   getCustomNightModeEnd()LLocalTime;
+   getCustomNightModeStart()LLocalTime;
+   setCustomNightModeEnd(LLocalTime;)V
+   setCustomNightModeStart(LLocalTime;)V
```


```diff
android/app/admin/DevicePolicyManager
+   ACTION_CHECK_POLICY_COMPLIANCE
+   ID_TYPE_INDIVIDUAL_ATTESTATION
+   LOCK_TASK_FEATURE_BLOCK_ACTIVITY_START_IN_TASK
+   PERSONAL_APPS_NOT_SUSPENDED
+   PERSONAL_APPS_SUSPENDED_EXPLICITLY
+   PERSONAL_APPS_SUSPENDED_PROFILE_TIMEOUT
+   getAutoTimeEnabled(LComponentName;)Z
-   getAutoTimeRequired()Z
+   getAutoTimeZoneEnabled(LComponentName;)Z
+   getCrossProfilePackages(LComponentName;)LSet;
+   getFactoryResetProtectionPolicy(LComponentName;)LFactoryResetProtectionPolicy;
+   getManagedProfileMaximumTimeOff(LComponentName;)J
+   getPersonalAppsSuspendedReasons(LComponentName;)I
-   getStorageEncryption(LComponentName;)Z
+   getUserControlDisabledPackages(LComponentName;)LList;
+   grantKeyPairToApp(LComponentName;LString;LString;)Z
+   hasLockdownAdminConfiguredNetworks(LComponentName;)Z
+   isCommonCriteriaModeEnabled(LComponentName;)Z
+   isOrganizationOwnedDeviceWithManagedProfile()Z
+   isUniqueDeviceAttestationSupported()Z
-   resetPassword(LString;I)Z
+   revokeKeyPairFromApp(LComponentName;LString;LString;)Z
+   setAutoTimeEnabled(LComponentName;Z)V
-   setAutoTimeRequired(LComponentName;Z)V
+   setAutoTimeZoneEnabled(LComponentName;Z)V
+   setCommonCriteriaModeEnabled(LComponentName;Z)V
+   setConfiguredNetworksLockdownState(LComponentName;Z)V
+   setCrossProfilePackages(LComponentName;LSet;)V
+   setFactoryResetProtectionPolicy(LComponentName;LFactoryResetProtectionPolicy;)V
+   setLocationEnabled(LComponentName;Z)V
+   setManagedProfileMaximumTimeOff(LComponentName;J)V
+   setPersonalAppsSuspended(LComponentName;Z)V
-   setStorageEncryption(LComponentName;Z)I
+   setUserControlDisabledPackages(LComponentName;LList;)V
```


```diff
+android/app/admin/FactoryResetProtectionPolicy
```


```diff
+android/app/admin/FactoryResetProtectionPolicy$Builder
```


```diff
android/app/admin/SecurityLog
+   TAG_CAMERA_POLICY_SET
```


```diff
android/app/assist/AssistStructure$ViewNode
+   getHintIdEntry()LString;
```


```diff
+android/app/blob/BlobHandle
```


```diff
+android/app/blob/BlobStoreManager
```


```diff
+android/app/blob/BlobStoreManager$Session
```


```diff
android/app/usage/UsageStatsManager
+   STANDBY_BUCKET_RESTRICTED
```


```diff
android/appwidget/AppWidgetHost
+   onAppWidgetRemoved(I)V
```


```diff
android/appwidget/AppWidgetManager
+   OPTION_APPWIDGET_RESTORE_COMPLETED
```


```diff
android/bluetooth/BluetoothDevice
+   ACTION_ALIAS_CHANGED
+   getAlias()LString;
```


```diff
android/companion/WifiDeviceFilter$Builder
+   setBssid(LMacAddress;)LBuilder;
+   setBssidMask(LMacAddress;)LBuilder;
```


```diff
android/content/ClipDescription
+   MIMETYPE_UNKNOWN
```


```diff
android/content/ContentProvider
+   delete(LUri;LBundle;)I
+   getCallingAttributionTag()LString;
+   getCallingPackageUnchecked()LString;
+   insert(LUri;LContentValues;LBundle;)LUri;
+   onCallingPackageChanged()V
+   requireContext()LContext;
+   update(LUri;LContentValues;LBundle;)I
```


```diff
android/content/ContentProviderClient
+   delete(LUri;LBundle;)I
+   insert(LUri;LContentValues;LBundle;)LUri;
+   update(LUri;LContentValues;LBundle;)I
```


```diff
android/content/ContentProviderOperation
+   isCall()Z
+   isExceptionAllowed()Z
+   newCall(LUri;LString;LString;)LBuilder;
+   resolveExtrasBackReferences([LContentProviderResult;I)LBundle;
```


```diff
android/content/ContentProviderOperation$Builder
+   withExceptionAllowed(Z)LBuilder;
+   withExtra(LString;LObject;)LBuilder;
+   withExtraBackReference(LString;I)LBuilder;
+   withExtraBackReference(LString;ILString;)LBuilder;
+   withExtras(LBundle;)LBuilder;
+   withSelectionBackReference(IILString;)LBuilder;
+   withValueBackReference(LString;ILString;)LBuilder;
```


```diff
android/content/ContentProviderResult
+   exception
+   extras
+   <init>(LBundle;)V
+   <init>(LThrowable;)V
```


```diff
android/content/ContentResolver
+   NOTIFY_DELETE
+   NOTIFY_INSERT
+   NOTIFY_UPDATE
+   QUERY_ARG_GROUP_COLUMNS
+   QUERY_ARG_SORT_LOCALE
+   QUERY_ARG_SQL_GROUP_BY
+   QUERY_ARG_SQL_HAVING
+   QUERY_ARG_SQL_LIMIT
+   delete(LUri;LBundle;)I
+   insert(LUri;LContentValues;LBundle;)LUri;
+   notifyChange(LCollection;LContentObserver;I)V
-   notifyChange(LUri;LContentObserver;Z)V
+   update(LUri;LContentValues;LBundle;)I
```


```diff
android/content/ContentValues
+   isEmpty()Z
```


```diff
android/content/Context
+   BLOB_STORE_SERVICE
+   CONNECTIVITY_DIAGNOSTICS_SERVICE
+   FILE_INTEGRITY_SERVICE
+   TELEPHONY_IMS_SERVICE
+   VPN_MANAGEMENT_SERVICE
+   bindServiceAsUser(LIntent;LServiceConnection;ILUserHandle;)Z
+   createAttributionContext(LString;)LContext;
+   createWindowContext(ILBundle;)LContext;
+   getAttributionTag()LString;
+   getDisplay()LDisplay;
-   getExternalMediaDirs()[LFile;
+   sendBroadcastWithMultiplePermissions(LIntent;[LString;)V
+   sendOrderedBroadcast(LIntent;LString;LString;LBroadcastReceiver;LHandler;ILString;LBundle;)V
```


```diff
android/content/ContextWrapper
+   sendOrderedBroadcast(LIntent;ILString;LString;LBroadcastReceiver;LHandler;LString;LBundle;LBundle;)V
```


```diff
android/content/Intent
+   ACTION_AUTO_REVOKE_PERMISSIONS
+   ACTION_CREATE_REMINDER
+   CATEGORY_ACCESSIBILITY_SHORTCUT_TARGET
+   EXTRA_TIME
+   EXTRA_TIMEZONE
+   FLAG_ACTIVITY_REQUIRE_DEFAULT
+   FLAG_ACTIVITY_REQUIRE_NON_BROWSER
```


```diff
android/content/pm/ActivityInfo
+   FLAG_PREFER_MINIMAL_POST_PROCESSING
```


```diff
android/content/pm/ApplicationInfo
-   FLAG_SUPPORTS_SCREEN_DENSITIES
+   GWP_ASAN_ALWAYS
+   GWP_ASAN_DEFAULT
+   GWP_ASAN_NEVER
+   getGwpAsanMode()I
```


```diff
android/content/pm/CrossProfileApps
+   ACTION_CAN_INTERACT_ACROSS_PROFILES_CHANGED
+   canInteractAcrossProfiles()Z
+   canRequestInteractAcrossProfiles()Z
+   createRequestInteractAcrossProfilesIntent()LIntent;
+   startActivity(LIntent;LUserHandle;LActivity;)V
+   startActivity(LIntent;LUserHandle;LActivity;LBundle;)V
```


```diff
+android/content/pm/InstallSourceInfo
```


```diff
android/content/pm/LauncherApps$Callback
-   onPackagesSuspended([LString;LUserHandle;LBundle;)V
```


```diff
android/content/pm/LauncherApps$ShortcutQuery
+   FLAG_MATCH_CACHED
+   setLocusIds(LList;)LShortcutQuery;
```


```diff
android/content/pm/PackageInstaller
-   getActiveStagedSession()LSessionInfo;
+   getActiveStagedSessions()LList;
```


```diff
android/content/pm/PackageInstaller$SessionInfo
+   getCreatedMillis()J
+   hasParentSessionId()Z
+   isStagedSessionActive()Z
```


```diff
android/content/pm/PackageInstaller$SessionParams
+   setAutoRevokePermissionsMode(Z)V
```


```diff
android/content/pm/PackageManager
+   FEATURE_CAMERA_CONCURRENT
+   FEATURE_CONTROLS
+   FEATURE_SENSOR_HINGE_ANGLE
+   FEATURE_SE_OMAPI_ESE
+   FEATURE_SE_OMAPI_SD
+   FEATURE_SE_OMAPI_UICC
+   FEATURE_VULKAN_DEQP_LEVEL
+   SYNCHRONOUS
+   getBackgroundPermissionOptionLabel()LCharSequence;
+   getInstallSourceInfo(LString;)LInstallSourceInfo;
-   getInstallerPackageName(LString;)LString;
+   getMimeGroup(LString;)LSet;
+   isAutoRevokeWhitelisted()Z
+   isAutoRevokeWhitelisted(LString;)Z
+   isDefaultApplicationIcon(LDrawable;)Z
+   setAutoRevokeWhitelisted(LString;Z)Z
+   setMimeGroup(LString;LSet;)V
```


```diff
android/content/pm/ResolveInfo
+   isCrossProfileIntentForwarderActivity()Z
```


```diff
android/content/pm/ServiceInfo
+   FOREGROUND_SERVICE_TYPE_CAMERA
+   FOREGROUND_SERVICE_TYPE_MICROPHONE
```


```diff
android/content/pm/ShortcutInfo
+   isCached()Z
```


```diff
android/content/pm/ShortcutManager
+   FLAG_MATCH_CACHED
+   FLAG_MATCH_DYNAMIC
+   FLAG_MATCH_MANIFEST
+   FLAG_MATCH_PINNED
+   getShortcuts(I)LList;
+   pushDynamicShortcut(LShortcutInfo;)V
+   removeLongLivedShortcuts(LList;)V
```


```diff
android/content/res/Configuration
+   isNightModeActive()Z
```


```diff
android/content/res/Resources
+   addLoaders([LResourcesLoader;)V
+   removeLoaders([LResourcesLoader;)V
```


```diff
+android/content/res/loader/AssetsProvider
```


```diff
+android/content/res/loader/ResourcesLoader
```


```diff
+android/content/res/loader/ResourcesProvider
```


```diff
android/database/ContentObserver
+   dispatchChange(ZLCollection;I)V
+   dispatchChange(ZLUri;I)V
+   onChange(ZLCollection;I)V
+   onChange(ZLUri;I)V
```


```diff
android/database/sqlite/SQLiteDatabase
+   execPerConnectionSQL(LString;[LObject;)V
+   setCustomAggregateFunction(LString;LBinaryOperator;)V
+   setCustomScalarFunction(LString;LUnaryOperator;)V
```


```diff
android/database/sqlite/SQLiteQueryBuilder
+   getProjectionGreylist()LCollection;
+   insert(LSQLiteDatabase;LContentValues;)J
+   isStrictColumns()Z
+   isStrictGrammar()Z
+   setProjectionGreylist(LCollection;)V
+   setStrictColumns(Z)V
+   setStrictGrammar(Z)V
```


```diff
-android/drm/DrmConvertedStatus
-   STATUS_ERROR
-   STATUS_INPUTDATA_ERROR
-   STATUS_OK
-   convertedData
-   offset
-   statusCode
-   <init>(I[BI)V
```


```diff
-android/drm/DrmErrorEvent
-   TYPE_ACQUIRE_DRM_INFO_FAILED
-   TYPE_NOT_SUPPORTED
-   TYPE_NO_INTERNET_CONNECTION
-   TYPE_OUT_OF_MEMORY
-   TYPE_PROCESS_DRM_INFO_FAILED
-   TYPE_REMOVE_ALL_RIGHTS_FAILED
-   TYPE_RIGHTS_NOT_INSTALLED
-   TYPE_RIGHTS_RENEWAL_NOT_ALLOWED
-   <init>(IILString;)V
-   <init>(IILString;LHashMap;)V
```


```diff
-android/drm/DrmEvent
-   DRM_INFO_OBJECT
-   DRM_INFO_STATUS_OBJECT
-   TYPE_ALL_RIGHTS_REMOVED
-   TYPE_DRM_INFO_PROCESSED
-   <init>(IILString;)V
-   <init>(IILString;LHashMap;)V
-   getAttribute(LString;)LObject;
-   getMessage()LString;
-   getType()I
-   getUniqueId()I
```


```diff
-android/drm/DrmInfo
-   <init>(ILString;LString;)V
-   <init>(I[BLString;)V
-   get(LString;)LObject;
-   getData()[B
-   getInfoType()I
-   getMimeType()LString;
-   iterator()LIterator;
-   keyIterator()LIterator;
-   put(LString;LObject;)V
```


```diff
-android/drm/DrmInfoEvent
-   TYPE_ACCOUNT_ALREADY_REGISTERED
-   TYPE_ALREADY_REGISTERED_BY_ANOTHER_ACCOUNT
-   TYPE_REMOVE_RIGHTS
-   TYPE_RIGHTS_INSTALLED
-   TYPE_RIGHTS_REMOVED
-   TYPE_WAIT_FOR_RIGHTS
-   <init>(IILString;)V
-   <init>(IILString;LHashMap;)V
```


```diff
-android/drm/DrmInfoRequest
-   ACCOUNT_ID
-   SUBSCRIPTION_ID
-   TYPE_REGISTRATION_INFO
-   TYPE_RIGHTS_ACQUISITION_INFO
-   TYPE_RIGHTS_ACQUISITION_PROGRESS_INFO
-   TYPE_UNREGISTRATION_INFO
-   <init>(ILString;)V
-   get(LString;)LObject;
-   getInfoType()I
-   getMimeType()LString;
-   iterator()LIterator;
-   keyIterator()LIterator;
-   put(LString;LObject;)V
```


```diff
-android/drm/DrmInfoStatus
-   STATUS_ERROR
-   STATUS_OK
-   data
-   infoType
-   mimeType
-   statusCode
-   <init>(IILProcessedData;LString;)V
```


```diff
-android/drm/DrmManagerClient
-   ERROR_NONE
-   ERROR_UNKNOWN
-   <init>(LContext;)V
-   acquireDrmInfo(LDrmInfoRequest;)LDrmInfo;
-   acquireRights(LDrmInfoRequest;)I
-   canHandle(LString;LString;)Z
-   canHandle(LUri;LString;)Z
-   checkRightsStatus(LString;)I
-   checkRightsStatus(LString;I)I
-   checkRightsStatus(LUri;)I
-   checkRightsStatus(LUri;I)I
-   closeConvertSession(I)LDrmConvertedStatus;
-   convertData(I[B)LDrmConvertedStatus;
-   getAvailableDrmEngines()[LString;
-+   getAvailableDrmSupportInfo()LCollection;
-   getConstraints(LString;I)LContentValues;
-   getConstraints(LUri;I)LContentValues;
-   getDrmObjectType(LString;LString;)I
-   getDrmObjectType(LUri;LString;)I
-   getMetadata(LString;)LContentValues;
-   getMetadata(LUri;)LContentValues;
-   getOriginalMimeType(LString;)LString;
-   getOriginalMimeType(LUri;)LString;
-   openConvertSession(LString;)I
-   processDrmInfo(LDrmInfo;)I
-   removeAllRights()I
-   removeRights(LString;)I
-   removeRights(LUri;)I
-   saveRights(LDrmRights;LString;LString;)I
-   setOnErrorListener(LOnErrorListener;)V
-   setOnEventListener(LOnEventListener;)V
-   setOnInfoListener(LOnInfoListener;)V
```


```diff
-android/drm/DrmManagerClient$OnErrorListener
-   onError(LDrmManagerClient;LDrmErrorEvent;)V
```


```diff
-android/drm/DrmManagerClient$OnEventListener
-   onEvent(LDrmManagerClient;LDrmEvent;)V
```


```diff
-android/drm/DrmManagerClient$OnInfoListener
-   onInfo(LDrmManagerClient;LDrmInfoEvent;)V
```


```diff
-android/drm/DrmRights
-   <init>(LFile;LString;)V
-   <init>(LProcessedData;LString;)V
-   <init>(LString;LString;)V
-   <init>(LString;LString;LString;)V
-   <init>(LString;LString;LString;LString;)V
-   getAccountId()LString;
-   getData()[B
-   getMimeType()LString;
-   getSubscriptionId()LString;
```


```diff
-android/drm/DrmStore
```


```diff
-android/drm/DrmStore$Action
-   DEFAULT
-   DISPLAY
-   EXECUTE
-   OUTPUT
-   PLAY
-   PREVIEW
-   RINGTONE
-   TRANSFER
```


```diff
-android/drm/DrmStore$ConstraintsColumns
-   EXTENDED_METADATA
-   LICENSE_AVAILABLE_TIME
-   LICENSE_EXPIRY_TIME
-   LICENSE_START_TIME
-   MAX_REPEAT_COUNT
-   REMAINING_REPEAT_COUNT
```


```diff
-android/drm/DrmStore$DrmObjectType
-   CONTENT
-   RIGHTS_OBJECT
-   TRIGGER_OBJECT
-   UNKNOWN
```


```diff
-android/drm/DrmStore$Playback
-   PAUSE
-   RESUME
-   START
-   STOP
```


```diff
-android/drm/DrmStore$RightsStatus
-   RIGHTS_EXPIRED
-   RIGHTS_INVALID
-   RIGHTS_NOT_ACQUIRED
-   RIGHTS_VALID
```


```diff
-android/drm/DrmSupportInfo
-   <init>()V
-   addFileSuffix(LString;)V
-   addMimeType(LString;)V
-   getDescription()LString;
-   getFileSuffixIterator()LIterator;
-   getMimeTypeIterator()LIterator;
-   setDescription(LString;)V
```


```diff
-android/drm/DrmUtils
-   <init>()V
-   getExtendedMetadataParser([B)LExtendedMetadataParser;
```


```diff
-android/drm/DrmUtils$ExtendedMetadataParser
-   get(LString;)LString;
-   iterator()LIterator;
-   keyIterator()LIterator;
```


```diff
-android/drm/ProcessedData
-   getAccountId()LString;
-   getData()[B
-   getSubscriptionId()LString;
```


```diff
android/gesture/GestureLibraries
+   fromFileDescriptor(LParcelFileDescriptor;)LGestureLibrary;
```


```diff
android/graphics/Bitmap$CompressFormat
-   WEBP
+   WEBP_LOSSLESS
+   WEBP_LOSSY
```


```diff
android/graphics/Canvas
+   quickReject(FFFF)Z
-   quickReject(FFFFLEdgeType;)Z
+   quickReject(LPath;)Z
-   quickReject(LPath;LEdgeType;)Z
+   quickReject(LRectF;)Z
-   quickReject(LRectF;LEdgeType;)Z
```


```diff
-android/graphics/Canvas$EdgeType
-   AA
-   BW
```


```diff
android/graphics/Outline
-   setConvexPath(LPath;)V
+   setPath(LPath;)V
```


```diff
android/graphics/Path
-   isConvex()Z
```


```diff
android/graphics/PointF
+   <init>(LPointF;)V
```


```diff
android/graphics/drawable/Icon
+   TYPE_URI_ADAPTIVE_BITMAP
+   createWithAdaptiveBitmapContentUri(LString;)LIcon;
+   createWithAdaptiveBitmapContentUri(LUri;)LIcon;
```


```diff
android/hardware/HardwareBuffer
+   YCBCR_420_888
```


```diff
android/hardware/Sensor
+   STRING_TYPE_HINGE_ANGLE
+   TYPE_HINGE_ANGLE
```


```diff
android/hardware/biometrics/BiometricManager
+   BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED
-   canAuthenticate()I
+   canAuthenticate(I)I
```


```diff
+android/hardware/biometrics/BiometricManager$Authenticators
```


```diff
android/hardware/biometrics/BiometricPrompt
+   AUTHENTICATION_RESULT_TYPE_BIOMETRIC
+   AUTHENTICATION_RESULT_TYPE_DEVICE_CREDENTIAL
+   BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED
+   getAllowedAuthenticators()I
+   getDescription()LCharSequence;
+   getNegativeButtonText()LCharSequence;
+   getSubtitle()LCharSequence;
+   getTitle()LCharSequence;
+   isConfirmationRequired()Z
```


```diff
android/hardware/biometrics/BiometricPrompt$AuthenticationResult
+   getAuthenticationType()I
```


```diff
android/hardware/biometrics/BiometricPrompt$Builder
+   setAllowedAuthenticators(I)LBuilder;
-   setDeviceCredentialAllowed(Z)LBuilder;
```


```diff
android/hardware/biometrics/BiometricPrompt$CryptoObject
+   <init>(LIdentityCredential;)V
+   getIdentityCredential()LIdentityCredential;
```


```diff
android/hardware/camera2/CameraCaptureSession
+   supportsOfflineProcessing(LSurface;)Z
+   switchToOffline(LCollection;LExecutor;LCameraOfflineSessionCallback;)LCameraOfflineSession;
```


```diff
android/hardware/camera2/CameraCharacteristics
+   CONTROL_AVAILABLE_EXTENDED_SCENE_MODE_CAPABILITIES
+   CONTROL_ZOOM_RATIO_RANGE
+   SCALER_MANDATORY_CONCURRENT_STREAM_COMBINATIONS
```


```diff
android/hardware/camera2/CameraDevice
+   AUDIO_RESTRICTION_NONE
+   AUDIO_RESTRICTION_VIBRATION
+   AUDIO_RESTRICTION_VIBRATION_SOUND
-   createCaptureSession(LList;LStateCallback;LHandler;)V
-   createCaptureSessionByOutputConfigurations(LList;LStateCallback;LHandler;)V
-   createConstrainedHighSpeedCaptureSession(LList;LStateCallback;LHandler;)V
-   createReprocessableCaptureSession(LInputConfiguration;LList;LStateCallback;LHandler;)V
-   createReprocessableCaptureSessionByConfigurations(LInputConfiguration;LList;LStateCallback;LHandler;)V
+   getCameraAudioRestriction()I
+   setCameraAudioRestriction(I)V
```


```diff
android/hardware/camera2/CameraManager
+   getConcurrentCameraIds()LSet;
+   isConcurrentSessionConfigurationSupported(LMap;)Z
```


```diff
android/hardware/camera2/CameraManager$AvailabilityCallback
+   onPhysicalCameraAvailable(LString;LString;)V
+   onPhysicalCameraUnavailable(LString;LString;)V
```


```diff
android/hardware/camera2/CameraMetadata
+   CONTROL_EXTENDED_SCENE_MODE_BOKEH_CONTINUOUS
+   CONTROL_EXTENDED_SCENE_MODE_BOKEH_STILL_CAPTURE
+   CONTROL_EXTENDED_SCENE_MODE_DISABLED
+   CONTROL_MODE_USE_EXTENDED_SCENE_MODE
+   LENS_POSE_REFERENCE_UNDEFINED
+   REQUEST_AVAILABLE_CAPABILITIES_OFFLINE_PROCESSING
+   REQUEST_AVAILABLE_CAPABILITIES_SYSTEM_CAMERA
```


```diff
+android/hardware/camera2/CameraOfflineSession
```


```diff
+android/hardware/camera2/CameraOfflineSession$CameraOfflineSessionCallback
```


```diff
android/hardware/camera2/CaptureRequest
+   CONTROL_EXTENDED_SCENE_MODE
+   CONTROL_ZOOM_RATIO
```


```diff
android/hardware/camera2/CaptureResult
+   CONTROL_EXTENDED_SCENE_MODE
+   CONTROL_ZOOM_RATIO
```


```diff
+android/hardware/camera2/params/Capability
```


```diff
android/hardware/input/InputManager
+   verifyInputEvent(LInputEvent;)LVerifiedInputEvent;
```


```diff
android/icu/lang/UCharacter$IndicPositionalCategory
+   TOP_AND_BOTTOM_AND_LEFT
```


```diff
android/icu/lang/UCharacter$UnicodeBlock
+   CHORASMIAN
+   CHORASMIAN_ID
+   CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G
+   CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G_ID
+   DIVES_AKURU
+   DIVES_AKURU_ID
+   EGYPTIAN_HIEROGLYPH_FORMAT_CONTROLS
+   EGYPTIAN_HIEROGLYPH_FORMAT_CONTROLS_ID
+   ELYMAIC
+   ELYMAIC_ID
+   KHITAN_SMALL_SCRIPT
+   KHITAN_SMALL_SCRIPT_ID
+   LISU_SUPPLEMENT
+   LISU_SUPPLEMENT_ID
+   NANDINAGARI
+   NANDINAGARI_ID
+   NYIAKENG_PUACHUE_HMONG
+   NYIAKENG_PUACHUE_HMONG_ID
+   OTTOMAN_SIYAQ_NUMBERS
+   OTTOMAN_SIYAQ_NUMBERS_ID
+   SMALL_KANA_EXTENSION
+   SMALL_KANA_EXTENSION_ID
+   SYMBOLS_AND_PICTOGRAPHS_EXTENDED_A
+   SYMBOLS_AND_PICTOGRAPHS_EXTENDED_A_ID
+   SYMBOLS_FOR_LEGACY_COMPUTING
+   SYMBOLS_FOR_LEGACY_COMPUTING_ID
+   TAMIL_SUPPLEMENT
+   TAMIL_SUPPLEMENT_ID
+   TANGUT_SUPPLEMENT
+   TANGUT_SUPPLEMENT_ID
+   WANCHO
+   WANCHO_ID
+   YEZIDI
+   YEZIDI_ID
```


```diff
android/icu/lang/UScript
+   CHORASMIAN
+   DIVES_AKURU
+   ELYMAIC
+   KHITAN_SMALL_SCRIPT
+   NANDINAGARI
+   NYIAKENG_PUACHUE_HMONG
+   WANCHO
+   YEZIDI
```


```diff
+android/icu/number/CompactNotation
```


```diff
+android/icu/number/CurrencyPrecision
```


```diff
+android/icu/number/FormattedNumber
```


```diff
+android/icu/number/FormattedNumberRange
```


```diff
+android/icu/number/FractionPrecision
```


```diff
+android/icu/number/IntegerWidth
```


```diff
+android/icu/number/LocalizedNumberFormatter
```


```diff
+android/icu/number/LocalizedNumberRangeFormatter
```


```diff
+android/icu/number/Notation
```


```diff
+android/icu/number/NumberFormatter
```


```diff
+android/icu/number/NumberFormatter$DecimalSeparatorDisplay
```


```diff
+android/icu/number/NumberFormatter$GroupingStrategy
```


```diff
+android/icu/number/NumberFormatter$SignDisplay
```


```diff
+android/icu/number/NumberFormatter$UnitWidth
```


```diff
+android/icu/number/NumberFormatterSettings
```


```diff
+android/icu/number/NumberRangeFormatter
```


```diff
+android/icu/number/NumberRangeFormatter$RangeCollapse
```


```diff
+android/icu/number/NumberRangeFormatter$RangeIdentityFallback
```


```diff
+android/icu/number/NumberRangeFormatter$RangeIdentityResult
```


```diff
+android/icu/number/NumberRangeFormatterSettings
```


```diff
+android/icu/number/Precision
```


```diff
+android/icu/number/Scale
```


```diff
+android/icu/number/ScientificNotation
```


```diff
+android/icu/number/SimpleNotation
```


```diff
+android/icu/number/UnlocalizedNumberFormatter
```


```diff
+android/icu/number/UnlocalizedNumberRangeFormatter
```


```diff
android/icu/text/DateTimePatternGenerator
+   getFieldDisplayName(ILDisplayWidth;)LString;
```


```diff
+android/icu/text/DateTimePatternGenerator$DisplayWidth
```


```diff
android/icu/util/Currency
+   NARROW_SYMBOL_NAME
```


```diff
android/icu/util/JapaneseCalendar
+   REIWA
```


```diff
android/icu/util/MeasureUnit
+   ATMOSPHERE
+   PERCENT
+   PERMILLE
+   PETABYTE
```


```diff
android/icu/util/VersionInfo
+   UNICODE_12_0
+   UNICODE_12_1
+   UNICODE_13_0
```


```diff
android/inputmethodservice/InputMethodService
+   onCreateInlineSuggestionsRequest(LBundle;)LInlineSuggestionsRequest;
+   onInlineSuggestionsResponse(LInlineSuggestionsResponse;)Z
```


```diff
+android/location/GnssAntennaInfo
```


```diff
+android/location/GnssAntennaInfo$Builder
```


```diff
+android/location/GnssAntennaInfo$Listener
```


```diff
+android/location/GnssAntennaInfo$PhaseCenterOffset
```


```diff
+android/location/GnssAntennaInfo$SphericalCorrections
```


```diff
+android/location/GnssCapabilities
```


```diff
android/location/GnssClock
+   getReferenceCarrierFrequencyHzForIsb()D
+   getReferenceCodeTypeForIsb()LString;
+   getReferenceConstellationTypeForIsb()I
+   hasReferenceCarrierFrequencyHzForIsb()Z
+   hasReferenceCodeTypeForIsb()Z
+   hasReferenceConstellationTypeForIsb()Z
```


```diff
android/location/GnssMeasurement
+   getBasebandCn0DbHz()D
+   getFullInterSignalBiasNanos()D
+   getFullInterSignalBiasUncertaintyNanos()D
+   getSatelliteInterSignalBiasNanos()D
+   getSatelliteInterSignalBiasUncertaintyNanos()D
+   hasBasebandCn0DbHz()Z
+   hasFullInterSignalBiasNanos()Z
+   hasFullInterSignalBiasUncertaintyNanos()Z
+   hasSatelliteInterSignalBiasNanos()Z
+   hasSatelliteInterSignalBiasUncertaintyNanos()Z
```


```diff
android/location/GnssNavigationMessage
+   TYPE_BDS_CNAV1
+   TYPE_BDS_CNAV2
+   TYPE_IRN_L5CA
+   TYPE_QZS_L1CA
+   TYPE_SBS
```


```diff
android/location/GnssStatus
+   getBasebandCn0DbHz(I)F
+   hasBasebandCn0DbHz(I)Z
```


```diff
+android/location/GnssStatus$Builder
```


```diff
android/location/GpsStatus
-+   create(LGnssStatus;I)LGpsStatus;
```


```diff
android/location/LocationManager
+   EXTRA_LOCATION_ENABLED
+   EXTRA_PROVIDER_ENABLED
+   addNmeaListener(LExecutor;LOnNmeaMessageListener;)Z
-   addNmeaListener(LOnNmeaMessageListener;)Z
+   getCurrentLocation(LString;LCancellationSignal;LExecutor;LConsumer;)V
+   getGnssCapabilities()LGnssCapabilities;
+   registerAntennaInfoListener(LExecutor;LListener;)Z
-   registerGnssMeasurementsCallback(LCallback;)Z
+   registerGnssMeasurementsCallback(LExecutor;LCallback;)Z
-   registerGnssNavigationMessageCallback(LCallback;)Z
+   registerGnssNavigationMessageCallback(LExecutor;LCallback;)Z
-   registerGnssStatusCallback(LCallback;)Z
+   registerGnssStatusCallback(LExecutor;LCallback;)Z
+   requestLocationUpdates(JFLCriteria;LExecutor;LLocationListener;)V
+   requestLocationUpdates(LString;JFLExecutor;LLocationListener;)V
-   requestSingleUpdate(LCriteria;LLocationListener;LLooper;)V
-   requestSingleUpdate(LCriteria;LPendingIntent;)V
-   requestSingleUpdate(LString;LLocationListener;LLooper;)V
-   requestSingleUpdate(LString;LPendingIntent;)V
+   unregisterAntennaInfoListener(LListener;)V
```


```diff
android/media/AudioDeviceInfo
+   TYPE_BUILTIN_SPEAKER_SAFE
+   getEncapsulationMetadataTypes()[I
+   getEncapsulationModes()[I
```


```diff
android/media/AudioFormat
+   ENCODING_OPUS
```


```diff
android/media/AudioManager
+   MODE_CALL_SCREENING
+   isCallScreeningModeSupported()Z
```


```diff
+android/media/AudioMetadata
```


```diff
+android/media/AudioMetadata$Format
```


```diff
+android/media/AudioMetadata$Key
```


```diff
+android/media/AudioMetadataMap
```


```diff
+android/media/AudioMetadataReadMap
```


```diff
android/media/AudioRecord
+   isPrivacySensitive()Z
```


```diff
android/media/AudioRecord$Builder
+   setPrivacySensitive(Z)LBuilder;
```


```diff
android/media/AudioTrack
+   DUAL_MONO_MODE_LL
+   DUAL_MONO_MODE_LR
+   DUAL_MONO_MODE_OFF
+   DUAL_MONO_MODE_RR
+   ENCAPSULATION_METADATA_TYPE_DVB_AD_DESCRIPTOR
+   ENCAPSULATION_METADATA_TYPE_FRAMEWORK_TUNER
+   ENCAPSULATION_MODE_ELEMENTARY_STREAM
+   ENCAPSULATION_MODE_NONE
+   addOnCodecFormatChangedListener(LExecutor;LOnCodecFormatChangedListener;)V
+   getAudioDescriptionMixLeveldB()F
+   getDualMonoMode()I
+   removeOnCodecFormatChangedListener(LOnCodecFormatChangedListener;)V
+   setAudioDescriptionMixLeveldB(F)Z
+   setDualMonoMode(I)Z
```


```diff
android/media/AudioTrack$Builder
+   setEncapsulationMode(I)LBuilder;
```


```diff
+android/media/AudioTrack$OnCodecFormatChangedListener
```


```diff
android/media/CamcorderProfile
+   QUALITY_2K
+   QUALITY_4KDCI
+   QUALITY_HIGH_SPEED_4KDCI
+   QUALITY_HIGH_SPEED_CIF
+   QUALITY_HIGH_SPEED_VGA
+   QUALITY_QHD
+   QUALITY_TIME_LAPSE_2K
+   QUALITY_TIME_LAPSE_4KDCI
+   QUALITY_TIME_LAPSE_QHD
+   QUALITY_TIME_LAPSE_VGA
+   QUALITY_VGA
```


```diff
android/media/DrmInitData
-   get(LUUID;)LSchemeInitData;
+   getSchemeInitDataAt(I)LSchemeInitData;
+   getSchemeInitDataCount()I
```


```diff
android/media/DrmInitData$SchemeInitData
+   UUID_NIL
+   uuid
```


```diff
android/media/ExifInterface
+   STREAM_TYPE_EXIF_DATA_ONLY
+   STREAM_TYPE_FULL_IMAGE_DATA
+   TAG_OFFSET_TIME
+   TAG_OFFSET_TIME_DIGITIZED
+   TAG_OFFSET_TIME_ORIGINAL
+   TAG_THUMBNAIL_ORIENTATION
+   <init>(LInputStream;I)V
+   isSupportedMimeType(LString;)Z
```


```diff
android/media/MediaCas
+   PLUGIN_STATUS_PHYSICAL_MODULE_CHANGED
+   PLUGIN_STATUS_SESSION_NUMBER_CHANGED
+   SCRAMBLING_MODE_AES128
+   SCRAMBLING_MODE_AES_ECB
+   SCRAMBLING_MODE_AES_SCTE52
+   SCRAMBLING_MODE_DVB_CISSA_V1
+   SCRAMBLING_MODE_DVB_CSA1
+   SCRAMBLING_MODE_DVB_CSA2
+   SCRAMBLING_MODE_DVB_CSA3_ENHANCE
+   SCRAMBLING_MODE_DVB_CSA3_MINIMAL
+   SCRAMBLING_MODE_DVB_CSA3_STANDARD
+   SCRAMBLING_MODE_DVB_IDSA
+   SCRAMBLING_MODE_MULTI2
+   SCRAMBLING_MODE_RESERVED
+   SCRAMBLING_MODE_TDES_ECB
+   SCRAMBLING_MODE_TDES_SCTE52
+   SESSION_USAGE_LIVE
+   SESSION_USAGE_PLAYBACK
+   SESSION_USAGE_RECORD
+   SESSION_USAGE_TIMESHIFT
+   <init>(LContext;ILString;I)V
+   openSession(II)LSession;
```


```diff
android/media/MediaCas$EventListener
+   onPluginStatusUpdate(LMediaCas;II)V
+   onResourceLost(LMediaCas;)V
```


```diff
android/media/MediaCas$Session
+   getSessionId()[B
```


```diff
+android/media/MediaCasException$InsufficientResourceException
```


```diff
android/media/MediaCodec
+   CONFIGURE_FLAG_USE_BLOCK_MODEL
+   PARAMETER_KEY_LOW_LATENCY
+   getOutputFrame(I)LOutputFrame;
+   getQueueRequest(I)LQueueRequest;
+   mapHardwareBuffer(LHardwareBuffer;)LImage;
```


```diff
+android/media/MediaCodec$IncompatibleWithBlockModelException
```


```diff
+android/media/MediaCodec$LinearBlock
```


```diff
+android/media/MediaCodec$OutputFrame
```


```diff
+android/media/MediaCodec$QueueRequest
```


```diff
android/media/MediaCodecInfo$CodecCapabilities
+   FEATURE_LowLatency
```


```diff
android/media/MediaCodecInfo$CodecProfileLevel
+   DolbyVisionProfileDvav110
```


```diff
android/media/MediaDrm
+   getSupportedCryptoSchemes()LList;
```


```diff
android/media/MediaFormat
+   KEY_AAC_DRC_ALBUM_MODE
+   KEY_AAC_DRC_OUTPUT_LOUDNESS
+   KEY_CAPTION_SERVICE_NUMBER
+   KEY_CODECS_STRING
+   KEY_ENCODER_DELAY
+   KEY_ENCODER_PADDING
+   KEY_HARDWARE_AV_SYNC_ID
+   KEY_LOW_LATENCY
+   KEY_PIXEL_ASPECT_RATIO_HEIGHT
+   KEY_PIXEL_ASPECT_RATIO_WIDTH
```


```diff
android/media/MediaMetadataRetriever
+   METADATA_KEY_COLOR_RANGE
+   METADATA_KEY_COLOR_STANDARD
+   METADATA_KEY_COLOR_TRANSFER
+   getFrameAtTime(JILBitmapParams;)LBitmap;
+   getScaledFrameAtTime(JIIILBitmapParams;)LBitmap;
```


```diff
+android/media/MediaParser
```


```diff
+android/media/MediaParser$InputReader
```


```diff
+android/media/MediaParser$OutputConsumer
```


```diff
+android/media/MediaParser$ParsingException
```


```diff
+android/media/MediaParser$SeekMap
```


```diff
+android/media/MediaParser$SeekPoint
```


```diff
+android/media/MediaParser$SeekableInputReader
```


```diff
+android/media/MediaParser$TrackData
```


```diff
+android/media/MediaParser$UnrecognizedInputFormatException
```


```diff
android/media/MediaRecorder
+   isPrivacySensitive()Z
+   setPrivacySensitive(Z)V
```


```diff
+android/media/MediaRoute2Info
```


```diff
+android/media/MediaRoute2Info$Builder
```


```diff
+android/media/MediaRoute2ProviderService
```


```diff
+android/media/MediaRouter2
```


```diff
+android/media/MediaRouter2$ControllerCallback
```


```diff
+android/media/MediaRouter2$OnGetControllerHintsListener
```


```diff
+android/media/MediaRouter2$RouteCallback
```


```diff
+android/media/MediaRouter2$RoutingController
```


```diff
+android/media/MediaRouter2$TransferCallback
```


```diff
+android/media/RouteDiscoveryPreference
```


```diff
+android/media/RouteDiscoveryPreference$Builder
```


```diff
+android/media/RoutingSessionInfo
```


```diff
+android/media/RoutingSessionInfo$Builder
```


```diff
android/media/VolumeProvider
+   <init>(IIILString;)V
+   getVolumeControlId()LString;
```


```diff
android/media/audiofx/AudioEffect
+   EFFECT_POST_PROCESSING
+   EFFECT_PRE_PROCESSING
```


```diff
android/media/session/MediaController
+   getTag()LString;
```


```diff
android/media/session/MediaController$PlaybackInfo
+   getVolumeControlId()LString;
```


```diff
android/media/tv/TvContract$Channels
+   COLUMN_GLOBAL_CONTENT_ID
+   TYPE_ATSC3_T
```


```diff
android/media/tv/TvContract$PreviewPrograms
+   COLUMN_SPLIT_ID
```


```diff
android/media/tv/TvContract$Programs
+   COLUMN_EVENT_ID
+   COLUMN_GLOBAL_CONTENT_ID
+   COLUMN_SPLIT_ID
```


```diff
android/media/tv/TvContract$RecordedPrograms
+   COLUMN_SPLIT_ID
```


```diff
android/media/tv/TvContract$WatchNextPrograms
+   COLUMN_SPLIT_ID
```


```diff
android/media/tv/TvInputManager
+   VIDEO_UNAVAILABLE_REASON_CAS_BLACKOUT
+   VIDEO_UNAVAILABLE_REASON_CAS_CARD_INVALID
+   VIDEO_UNAVAILABLE_REASON_CAS_CARD_MUTE
+   VIDEO_UNAVAILABLE_REASON_CAS_INSUFFICIENT_OUTPUT_PROTECTION
+   VIDEO_UNAVAILABLE_REASON_CAS_LICENSE_EXPIRED
+   VIDEO_UNAVAILABLE_REASON_CAS_NEED_ACTIVATION
+   VIDEO_UNAVAILABLE_REASON_CAS_NEED_PAIRING
+   VIDEO_UNAVAILABLE_REASON_CAS_NO_CARD
+   VIDEO_UNAVAILABLE_REASON_CAS_PVR_RECORDING_NOT_ALLOWED
+   VIDEO_UNAVAILABLE_REASON_CAS_REBOOTING
+   VIDEO_UNAVAILABLE_REASON_CAS_UNKNOWN
+   VIDEO_UNAVAILABLE_REASON_INSUFFICIENT_RESOURCE
+   VIDEO_UNAVAILABLE_REASON_NOT_CONNECTED
```


```diff
android/media/tv/TvInputService
+   PRIORITY_HINT_USE_CASE_TYPE_BACKGROUND
+   PRIORITY_HINT_USE_CASE_TYPE_LIVE
+   PRIORITY_HINT_USE_CASE_TYPE_PLAYBACK
+   PRIORITY_HINT_USE_CASE_TYPE_RECORD
+   PRIORITY_HINT_USE_CASE_TYPE_SCAN
+   onCreateRecordingSession(LString;LString;)LRecordingSession;
+   onCreateSession(LString;LString;)LSession;
```


```diff
android/media/tv/TvInputService$RecordingSession
+   onStartRecording(LUri;LBundle;)V
```


```diff
android/media/tv/TvRecordingClient
+   startRecording(LUri;LBundle;)V
```


```diff
android/media/tv/TvTrackInfo
+   getEncoding()LString;
+   isAudioDescription()Z
+   isEncrypted()Z
+   isHardOfHearing()Z
+   isSpokenSubtitle()Z
```


```diff
android/media/tv/TvTrackInfo$Builder
+   setAudioDescription(Z)LBuilder;
+   setEncoding(LString;)LBuilder;
+   setEncrypted(Z)LBuilder;
+   setHardOfHearing(Z)LBuilder;
+   setSpokenSubtitle(Z)LBuilder;
```


```diff
+android/net/ConnectivityDiagnosticsManager
```


```diff
+android/net/ConnectivityDiagnosticsManager$ConnectivityDiagnosticsCallback
```


```diff
+android/net/ConnectivityDiagnosticsManager$ConnectivityReport
```


```diff
+android/net/ConnectivityDiagnosticsManager$DataStallReport
```


```diff
android/net/DhcpInfo
+   CREATOR
```


```diff
+android/net/Ikev2VpnProfile
```


```diff
+android/net/Ikev2VpnProfile$Builder
```


```diff
android/net/LinkProperties
+   getDhcpServerAddress()LInet4Address;
+   getNat64Prefix()LIpPrefix;
+   isWakeOnLanSupported()Z
+   setDhcpServerAddress(LInet4Address;)V
+   setNat64Prefix(LIpPrefix;)V
```


```diff
android/net/MacAddress
+   getLinkLocalIpv6FromEui48Mac()LInet6Address;
+   matches(LMacAddress;LMacAddress;)Z
```


```diff
android/net/NetworkCapabilities
+   NET_CAPABILITY_TEMPORARILY_NOT_METERED
+   <init>()V
+   getNetworkSpecifier()LNetworkSpecifier;
+   getOwnerUid()I
```


```diff
android/net/NetworkInfo
-+   <init>(IILString;LString;)V
-+   setDetailedState(LDetailedState;LString;LString;)V
```


```diff
android/net/NetworkRequest
+   canBeSatisfiedBy(LNetworkCapabilities;)Z
+   getNetworkSpecifier()LNetworkSpecifier;
```


```diff
android/net/NetworkRequest$Builder
+   clearCapabilities()LBuilder;
-   setNetworkSpecifier(LString;)LBuilder;
```


```diff
+android/net/PlatformVpnProfile
```


```diff
android/net/ProxyInfo
+   <init>(LProxyInfo;)V
+   buildPacProxy(LUri;I)LProxyInfo;
+   isValid()Z
```


```diff
+android/net/TelephonyNetworkSpecifier
```


```diff
+android/net/TelephonyNetworkSpecifier$Builder
```


```diff
android/net/TrafficStats
+   getRxPackets(LString;)J
+   getTxPackets(LString;)J
```


```diff
+android/net/VpnManager
```


```diff
android/net/rtp/AudioGroup
-   <init>()V
+   <init>(LContext;)V
```


```diff
android/net/sip/SipProfile
+   setCallingUid(I)V
```


```diff
+android/net/wifi/EasyConnectStatusCallback
```


```diff
android/net/wifi/ScanResult
+   CREATOR
+   WIFI_STANDARD_11AC
+   WIFI_STANDARD_11AX
+   WIFI_STANDARD_11N
+   WIFI_STANDARD_LEGACY
+   WIFI_STANDARD_UNKNOWN
+   <init>()V
+   <init>(LScanResult;)V
+   getInformationElements()LList;
+   getWifiStandard()I
```


```diff
+android/net/wifi/ScanResult$InformationElement
```


```diff
+android/net/wifi/SoftApConfiguration
```


```diff
android/net/wifi/WifiConfiguration
-+   SECURITY_TYPE_EAP
-+   SECURITY_TYPE_EAP_SUITE_B
-+   SECURITY_TYPE_OPEN
-+   SECURITY_TYPE_OWE
-+   SECURITY_TYPE_PSK
-+   SECURITY_TYPE_SAE
-+   SECURITY_TYPE_WAPI_CERT
-+   SECURITY_TYPE_WAPI_PSK
-+   SECURITY_TYPE_WEP
-+   <init>(LWifiConfiguration;)V
-+   getKey()LString;
-+   setSecurityParams(I)V
```


```diff
android/net/wifi/WifiConfiguration$AuthAlgorithm
-+   SAE
```


```diff
android/net/wifi/WifiConfiguration$GroupCipher
-+   SMS4
```


```diff
android/net/wifi/WifiConfiguration$PairwiseCipher
-+   SMS4
```


```diff
android/net/wifi/WifiConfiguration$Protocol
-+   WAPI
```


```diff
android/net/wifi/WifiEnterpriseConfig
+   EXTRA_WAPI_AS_CERTIFICATE_DATA
+   EXTRA_WAPI_AS_CERTIFICATE_NAME
+   EXTRA_WAPI_USER_CERTIFICATE_DATA
+   EXTRA_WAPI_USER_CERTIFICATE_NAME
+   WAPI_AS_CERTIFICATE
+   WAPI_USER_CERTIFICATE
+   getClientPrivateKey()LPrivateKey;
+   isAuthenticationSimBased()Z
```


```diff
android/net/wifi/WifiEnterpriseConfig$Eap
+   WAPI_CERT
```


```diff
android/net/wifi/WifiInfo
+   getMaxSupportedRxLinkSpeedMbps()I
+   getMaxSupportedTxLinkSpeedMbps()I
+   getWifiStandard()I
```


```diff
+android/net/wifi/WifiInfo$Builder
```


```diff
android/net/wifi/WifiManager
+   ACTION_WIFI_SCAN_AVAILABILITY_CHANGED
+   EXTRA_SCAN_AVAILABLE
+   STATUS_NETWORK_SUGGESTIONS_ERROR_ADD_INVALID
+   STATUS_NETWORK_SUGGESTIONS_ERROR_ADD_NOT_ALLOWED
+   STATUS_SUGGESTION_CONNECTION_FAILURE_ASSOCIATION
+   STATUS_SUGGESTION_CONNECTION_FAILURE_AUTHENTICATION
+   STATUS_SUGGESTION_CONNECTION_FAILURE_IP_PROVISIONING
+   STATUS_SUGGESTION_CONNECTION_FAILURE_UNKNOWN
+   UNKNOWN_SSID
+   addSuggestionConnectionStatusListener(LExecutor;LSuggestionConnectionStatusListener;)V
+   calculateSignalLevel(I)I
-   calculateSignalLevel(II)I
+   getMaxSignalLevel()I
+   getNetworkSuggestions()LList;
+   is6GHzBandSupported()Z
+   isAutoWakeupEnabled()Z
+   isScanThrottleEnabled()Z
+   isStaApConcurrencySupported()Z
+   isWapiSupported()Z
+   isWifiStandardSupported(I)Z
+   registerScanResultsCallback(LExecutor;LScanResultsCallback;)V
+   removeSuggestionConnectionStatusListener(LSuggestionConnectionStatusListener;)V
+   unregisterScanResultsCallback(LScanResultsCallback;)V
```


```diff
android/net/wifi/WifiManager$LocalOnlyHotspotReservation
+   getSoftApConfiguration()LSoftApConfiguration;
-   getWifiConfiguration()LWifiConfiguration;
```


```diff
+android/net/wifi/WifiManager$ScanResultsCallback
```


```diff
+android/net/wifi/WifiManager$SuggestionConnectionStatusListener
```


```diff
android/net/wifi/WifiNetworkSuggestion
+   getBssid()LMacAddress;
+   getEnterpriseConfig()LWifiEnterpriseConfig;
+   getPassphrase()LString;
+   getPasspointConfig()LPasspointConfiguration;
+   getPriority()I
+   getSsid()LString;
+   isAppInteractionRequired()Z
+   isCredentialSharedWithUser()Z
+   isEnhancedOpen()Z
+   isHiddenSsid()Z
+   isInitialAutojoinEnabled()Z
+   isMetered()Z
+   isUntrusted()Z
+   isUserInteractionRequired()Z
```


```diff
android/net/wifi/WifiNetworkSuggestion$Builder
+   setCredentialSharedWithUser(Z)LBuilder;
+   setIsInitialAutojoinEnabled(Z)LBuilder;
+   setPasspointConfig(LPasspointConfiguration;)LBuilder;
+   setUntrusted(Z)LBuilder;
+   setWapiEnterpriseConfig(LWifiEnterpriseConfig;)LBuilder;
+   setWapiPassphrase(LString;)LBuilder;
```


```diff
android/net/wifi/aware/Characteristics
+   WIFI_AWARE_CIPHER_SUITE_NCS_SK_128
+   WIFI_AWARE_CIPHER_SUITE_NCS_SK_256
+   getSupportedCipherSuites()I
```


```diff
android/net/wifi/aware/WifiAwareNetworkSpecifier$Builder
+   setPmk([B)LBuilder;
```


```diff
android/net/wifi/hotspot2/PasspointConfiguration
+   getSubscriptionExpirationTimeMillis()J
+   getUniqueId()LString;
+   isOsuProvisioned()Z
```


```diff
android/net/wifi/p2p/WifiP2pConfig
+   GROUP_OWNER_INTENT_AUTO
+   GROUP_OWNER_INTENT_MAX
+   GROUP_OWNER_INTENT_MIN
+   getGroupOwnerBand()I
+   getNetworkId()I
+   getNetworkName()LString;
+   getPassphrase()LString;
```


```diff
android/net/wifi/p2p/WifiP2pDevice
+   getWfdInfo()LWifiP2pWfdInfo;
+   update(LWifiP2pDevice;)V
```


```diff
android/net/wifi/p2p/WifiP2pGroup
+   NETWORK_ID_PERSISTENT
+   NETWORK_ID_TEMPORARY
+   getNetworkId()I
```


```diff
+android/net/wifi/p2p/WifiP2pWfdInfo
```


```diff
android/nfc/NfcAdapter
+   ACTION_PREFERRED_PAYMENT_CHANGED
+   EXTRA_PREFERRED_PAYMENT_CHANGED_REASON
+   PREFERRED_PAYMENT_CHANGED
+   PREFERRED_PAYMENT_LOADED
+   PREFERRED_PAYMENT_UPDATED
```


```diff
android/nfc/cardemulation/CardEmulation
+   getAidsForPreferredPaymentService()LList;
+   getDescriptionForPreferredPaymentService()LCharSequence;
+   getRouteDestinationForPreferredPaymentService()LString;
```


```diff
-android/os/AsyncTask
-   SERIAL_EXECUTOR
-   THREAD_POOL_EXECUTOR
-   <init>()V
-   cancel(Z)Z
-   doInBackground([LObject;)LObject;
-   execute(LRunnable;)V
-   execute([LObject;)LAsyncTask;
-   executeOnExecutor(LExecutor;[LObject;)LAsyncTask;
-   get()LObject;
-   get(JLTimeUnit;)LObject;
-   getStatus()LStatus;
-   isCancelled()Z
-   onCancelled()V
-   onCancelled(LObject;)V
-   onPostExecute(LObject;)V
-   onPreExecute()V
-   onProgressUpdate([LObject;)V
-   publishProgress([LObject;)V
```


```diff
-android/os/AsyncTask$Status
-   FINISHED
-   PENDING
-   RUNNING
```


```diff
android/os/Build$VERSION
+   RELEASE_OR_CODENAME
```


```diff
android/os/Build$VERSION_CODES
+   R
```


```diff
android/os/Environment
+   getStorageDirectory()LFile;
+   isExternalStorageManager()Z
+   isExternalStorageManager(LFile;)Z
```


```diff
android/os/FileUtils
-   closeQuietly(LAutoCloseable;)V
-   closeQuietly(LFileDescriptor;)V
```


```diff
android/os/Handler
-   <init>()V
-   <init>(LCallback;)V
```


```diff
android/os/IBinder
+   getSuggestedMaxIpcSizeBytes()I
```


```diff
+android/os/LimitExceededException
```


```diff
android/os/Looper
-   prepareMainLooper()V
```


```diff
android/os/Parcel
+   readParcelableCreator(LClassLoader;)LCreator;
+   writeParcelableCreator(LParcelable;)V
```


```diff
android/os/ParcelFileDescriptor
+   wrap(LParcelFileDescriptor;LHandler;LOnCloseListener;)LParcelFileDescriptor;
```


```diff
android/os/PersistableBundle
+   readFromStream(LInputStream;)LPersistableBundle;
+   writeToStream(LOutputStream;)V
```


```diff
android/os/PowerManager
+   getThermalHeadroom(I)F
+   isRebootingUserspaceSupported()Z
```


```diff
android/os/Process
+   WIFI_UID
```


```diff
android/os/RemoteException
+   rethrowAsRuntimeException()LRuntimeException;
+   rethrowFromSystemServer()LRuntimeException;
```


```diff
android/os/UserManager
-   DISALLOW_ADD_MANAGED_PROFILE
-   DISALLOW_REMOVE_MANAGED_PROFILE
+   QUIET_MODE_DISABLE_ONLY_IF_CREDENTIAL_NOT_REQUIRED
+   isManagedProfile()Z
+   requestQuietModeEnabled(ZLUserHandle;I)Z
```


```diff
+android/os/VibrationAttributes
```


```diff
+android/os/VibrationAttributes$Builder
```


```diff
android/os/VibrationEffect
+   startComposition()LComposition;
```


```diff
+android/os/VibrationEffect$Composition
```


```diff
android/os/Vibrator
+   VIBRATION_EFFECT_SUPPORT_NO
+   VIBRATION_EFFECT_SUPPORT_UNKNOWN
+   VIBRATION_EFFECT_SUPPORT_YES
+   areAllEffectsSupported([I)I
+   areAllPrimitivesSupported([I)Z
+   areEffectsSupported([I)[I
+   arePrimitivesSupported([I)[Z
```


```diff
android/os/storage/StorageManager
+   ACTION_CLEAR_APP_CACHE
+   getRecentStorageVolumes()LList;
+   isCheckpointSupported()Z
+   registerStorageVolumeCallback(LExecutor;LStorageVolumeCallback;)V
+   unregisterStorageVolumeCallback(LStorageVolumeCallback;)V
```


```diff
+android/os/storage/StorageManager$StorageVolumeCallback
```


```diff
android/os/storage/StorageVolume
+   getDirectory()LFile;
+   getMediaStoreVolumeName()LString;
```


```diff
android/provider/CallLog$Calls
+   FEATURES_ASSISTED_DIALING_USED
+   FEATURES_VOLTE
```


```diff
android/provider/ContactsContract$RawContacts
+   getLocalAccountName(LContext;)LString;
+   getLocalAccountType(LContext;)LString;
```


```diff
android/provider/ContactsContract$RawContactsColumns
-   METADATA_DIRTY
```


```diff
android/provider/DocumentsContract$Document
+   FLAG_DIR_BLOCKS_OPEN_DOCUMENT_TREE
```


```diff
android/provider/MediaStore
+   MATCH_DEFAULT
+   MATCH_EXCLUDE
+   MATCH_INCLUDE
+   MATCH_ONLY
+   META_DATA_REVIEW_GALLERY_PREWARM_SERVICE
+   QUERY_ARG_MATCH_FAVORITE
+   QUERY_ARG_MATCH_PENDING
+   QUERY_ARG_MATCH_TRASHED
+   QUERY_ARG_RELATED_URI
+   createDeleteRequest(LContentResolver;LCollection;)LPendingIntent;
+   createFavoriteRequest(LContentResolver;LCollection;Z)LPendingIntent;
+   createTrashRequest(LContentResolver;LCollection;Z)LPendingIntent;
+   createWriteRequest(LContentResolver;LCollection;)LPendingIntent;
+   getGeneration(LContext;LString;)J
+   getRecentExternalVolumeNames(LContext;)LSet;
+   getRequireOriginal(LUri;)Z
-   setIncludePending(LUri;)LUri;
```


```diff
android/provider/MediaStore$Audio
-   keyFor(LString;)LString;
```


```diff
android/provider/MediaStore$Audio$AlbumColumns
-   ALBUM_KEY
-+   ARTIST_KEY
```


```diff
android/provider/MediaStore$Audio$ArtistColumns
-   ARTIST_KEY
```


```diff
android/provider/MediaStore$Audio$AudioColumns
-   ALBUM_KEY
-   ARTIST_KEY
+   GENRE
+   GENRE_ID
-+   GENRE_KEY
-   TITLE_KEY
+   TITLE_RESOURCE_URI
```


```diff
android/provider/MediaStore$Audio$Media
+   getContentUri(LString;J)LUri;
```


```diff
android/provider/MediaStore$Downloads
+   getContentUri(LString;J)LUri;
```


```diff
android/provider/MediaStore$Files$FileColumns
+   MEDIA_TYPE_DOCUMENT
+   MEDIA_TYPE_SUBTITLE
```


```diff
android/provider/MediaStore$Images$ImageColumns
+   EXPOSURE_TIME
+   F_NUMBER
+   ISO
+   SCENE_CAPTURE_TYPE
```


```diff
android/provider/MediaStore$Images$Media
+   getContentUri(LString;J)LUri;
```


```diff
android/provider/MediaStore$Images$Thumbnails
-+   getKindSize(I)LSize;
```


```diff
android/provider/MediaStore$MediaColumns
+   ALBUM
+   ALBUM_ARTIST
+   ARTIST
+   AUTHOR
+   BITRATE
+   CAPTURE_FRAMERATE
+   CD_TRACK_NUMBER
+   COMPILATION
+   COMPOSER
+   DISC_NUMBER
+   GENERATION_ADDED
+   GENERATION_MODIFIED
+   GENRE
+   IS_DOWNLOAD
+   IS_DRM
+   IS_FAVORITE
+   IS_TRASHED
+   NUM_TRACKS
+   RESOLUTION
+   WRITER
+   XMP
+   YEAR
```


```diff
android/provider/MediaStore$Video$Media
+   getContentUri(LString;J)LUri;
```


```diff
android/provider/MediaStore$Video$Thumbnails
-+   getKindSize(I)LSize;
```


```diff
android/provider/MediaStore$Video$VideoColumns
+   COLOR_RANGE
+   COLOR_STANDARD
+   COLOR_TRANSFER
```


```diff
android/provider/Settings
+   ACTION_BIOMETRIC_ENROLL
+   ACTION_CONDITION_PROVIDER_SETTINGS
-   ACTION_FINGERPRINT_ENROLL
+   ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION
+   ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION
+   ACTION_NOTIFICATION_LISTENER_DETAIL_SETTINGS
+   ACTION_QUICK_ACCESS_WALLET_SETTINGS
+   ACTION_SHOW_WORK_POLICY_INFO
+   ACTION_WIFI_ADD_NETWORKS
+   ADD_WIFI_RESULT_ADD_OR_UPDATE_FAILED
+   ADD_WIFI_RESULT_ALREADY_EXISTS
+   ADD_WIFI_RESULT_SUCCESS
+   EXTRA_BIOMETRIC_AUTHENTICATORS_ALLOWED
+   EXTRA_CONVERSATION_ID
+   EXTRA_EASY_CONNECT_ATTEMPTED_SSID
+   EXTRA_EASY_CONNECT_BAND_LIST
+   EXTRA_EASY_CONNECT_CHANNEL_LIST
+   EXTRA_EASY_CONNECT_ERROR_CODE
+   EXTRA_NOTIFICATION_LISTENER_COMPONENT_NAME
+   EXTRA_WIFI_NETWORK_LIST
+   EXTRA_WIFI_NETWORK_RESULT_LIST
```


```diff
android/provider/Settings$Global
-   WIFI_NETWORKS_AVAILABLE_REPEAT_DELAY
-   WIFI_NUM_OPEN_NETWORKS_KEPT
-   WIFI_SLEEP_POLICY
-   WIFI_SLEEP_POLICY_DEFAULT
-   WIFI_SLEEP_POLICY_NEVER
-   WIFI_SLEEP_POLICY_NEVER_WHILE_PLUGGED
```


```diff
android/provider/Settings$Secure
+   SECURE_FRP_MODE
```


```diff
android/provider/Telephony$Mms$Addr
+   getAddrUriForMessage(LString;)LUri;
```


```diff
android/provider/Telephony$Mms$Part
+   getPartUriForMessage(LString;)LUri;
```


```diff
android/provider/Telephony$Sms$Intents
+   RESULT_SMS_DATABASE_ERROR
+   RESULT_SMS_DISPATCH_FAILURE
+   RESULT_SMS_INVALID_URI
+   RESULT_SMS_NULL_MESSAGE
+   RESULT_SMS_NULL_PDU
+   RESULT_SMS_RECEIVED_WHILE_ENCRYPTED
```


```diff
android/se/omapi/SEService
+   getUiccReader(I)LReader;
```


```diff
android/security/AttestedKeyPair
+   <init>(LKeyPair;LList;)V
```


```diff
+android/security/FileIntegrityManager
```


```diff
android/security/KeyChain
+   KEY_ALIAS_SELECTION_DENIED
```


```diff
+android/security/identity/AccessControlProfile
```


```diff
+android/security/identity/AccessControlProfile$Builder
```


```diff
+android/security/identity/AccessControlProfileId
```


```diff
+android/security/identity/AlreadyPersonalizedException
```


```diff
+android/security/identity/CipherSuiteNotSupportedException
```


```diff
+android/security/identity/DocTypeNotSupportedException
```


```diff
+android/security/identity/EphemeralPublicKeyNotFoundException
```


```diff
+android/security/identity/IdentityCredential
```


```diff
+android/security/identity/IdentityCredentialException
```


```diff
+android/security/identity/IdentityCredentialStore
```


```diff
+android/security/identity/InvalidReaderSignatureException
```


```diff
+android/security/identity/InvalidRequestMessageException
```


```diff
+android/security/identity/MessageDecryptionException
```


```diff
+android/security/identity/NoAuthenticationKeyAvailableException
```


```diff
+android/security/identity/PersonalizationData
```


```diff
+android/security/identity/PersonalizationData$Builder
```


```diff
+android/security/identity/ResultData
```


```diff
+android/security/identity/SessionTranscriptMismatchException
```


```diff
+android/security/identity/UnknownAuthenticationKeyException
```


```diff
+android/security/identity/WritableIdentityCredential
```


```diff
android/security/keystore/KeyGenParameterSpec
+   getUserAuthenticationType()I
```


```diff
android/security/keystore/KeyGenParameterSpec$Builder
+   setUserAuthenticationParameters(II)LBuilder;
-   setUserAuthenticationValidityDurationSeconds(I)LBuilder;
```


```diff
android/security/keystore/KeyInfo
+   getUserAuthenticationType()I
```


```diff
android/security/keystore/KeyProperties
+   AUTH_BIOMETRIC_STRONG
+   AUTH_DEVICE_CREDENTIAL
```


```diff
android/security/keystore/KeyProtection
+   getUserAuthenticationType()I
```


```diff
android/security/keystore/KeyProtection$Builder
+   setUserAuthenticationParameters(II)LBuilder;
-   setUserAuthenticationValidityDurationSeconds(I)LBuilder;
```


```diff
android/service/autofill/Dataset$Builder
+   setInlinePresentation(LInlinePresentation;)LBuilder;
+   setValue(LAutofillId;LAutofillValue;LPattern;LRemoteViews;LInlinePresentation;)LBuilder;
+   setValue(LAutofillId;LAutofillValue;LRemoteViews;LInlinePresentation;)LBuilder;
```


```diff
android/service/autofill/FillEventHistory$Event
+   TYPE_DATASETS_SHOWN
```


```diff
android/service/autofill/FillRequest
+   getInlineSuggestionsRequest()LInlineSuggestionsRequest;
```


```diff
android/service/autofill/FillResponse$Builder
+   setAuthentication([LAutofillId;LIntentSender;LRemoteViews;LInlinePresentation;)LBuilder;
+   setPresentationCancelIds([I)LBuilder;
```


```diff
+android/service/autofill/InlinePresentation
```


```diff
android/service/autofill/SaveInfo
+   NEGATIVE_BUTTON_STYLE_NEVER
+   POSITIVE_BUTTON_STYLE_CONTINUE
+   POSITIVE_BUTTON_STYLE_SAVE
+   SAVE_DATA_TYPE_DEBIT_CARD
+   SAVE_DATA_TYPE_GENERIC_CARD
+   SAVE_DATA_TYPE_PAYMENT_CARD
```


```diff
android/service/autofill/SaveInfo$Builder
+   setPositiveAction(I)LBuilder;
```


```diff
-android/service/chooser/ChooserTarget
-   CREATOR
-   <init>(LCharSequence;LIcon;FLComponentName;LBundle;)V
-   getComponentName()LComponentName;
-   getIcon()LIcon;
-   getIntentExtras()LBundle;
-   getScore()F
-   getTitle()LCharSequence;
```


```diff
-android/service/chooser/ChooserTargetService
-   BIND_PERMISSION
-   META_DATA_NAME
-   SERVICE_INTERFACE
-   <init>()V
-   onGetChooserTargets(LComponentName;LIntentFilter;)LList;
```


```diff
+android/service/controls/Control
```


```diff
+android/service/controls/Control$StatefulBuilder
```


```diff
+android/service/controls/Control$StatelessBuilder
```


```diff
+android/service/controls/ControlsProviderService
```


```diff
+android/service/controls/DeviceTypes
```


```diff
+android/service/controls/actions/BooleanAction
```


```diff
+android/service/controls/actions/CommandAction
```


```diff
+android/service/controls/actions/ControlAction
```


```diff
+android/service/controls/actions/FloatAction
```


```diff
+android/service/controls/actions/ModeAction
```


```diff
+android/service/controls/templates/ControlButton
```


```diff
+android/service/controls/templates/ControlTemplate
```


```diff
+android/service/controls/templates/RangeTemplate
```


```diff
+android/service/controls/templates/StatelessTemplate
```


```diff
+android/service/controls/templates/TemperatureControlTemplate
```


```diff
+android/service/controls/templates/ToggleRangeTemplate
```


```diff
+android/service/controls/templates/ToggleTemplate
```


```diff
android/service/notification/StatusBarNotification
+   isAppGroup()Z
```


```diff
android/service/notification/ZenPolicy
+   CONVERSATION_SENDERS_ANYONE
+   CONVERSATION_SENDERS_IMPORTANT
+   CONVERSATION_SENDERS_NONE
+   CONVERSATION_SENDERS_UNSET
+   getPriorityCategoryConversations()I
+   getPriorityConversationSenders()I
```


```diff
android/service/notification/ZenPolicy$Builder
+   allowConversations(I)LBuilder;
```


```diff
+android/service/quickaccesswallet/GetWalletCardsCallback
```


```diff
+android/service/quickaccesswallet/GetWalletCardsError
```


```diff
+android/service/quickaccesswallet/GetWalletCardsRequest
```


```diff
+android/service/quickaccesswallet/GetWalletCardsResponse
```


```diff
+android/service/quickaccesswallet/QuickAccessWalletService
```


```diff
+android/service/quickaccesswallet/SelectWalletCardRequest
```


```diff
+android/service/quickaccesswallet/WalletCard
```


```diff
+android/service/quickaccesswallet/WalletCard$Builder
```


```diff
+android/service/quickaccesswallet/WalletServiceEvent
```


```diff
android/service/quicksettings/Tile
+   getStateDescription()LCharSequence;
+   setStateDescription(LCharSequence;)V
```


```diff
android/service/quicksettings/TileService
+   META_DATA_TOGGLEABLE_TILE
```


```diff
android/service/voice/AlwaysOnHotwordDetector
+   AUDIO_CAPABILITY_ECHO_CANCELLATION
+   AUDIO_CAPABILITY_NOISE_SUPPRESSION
+   MODEL_PARAM_THRESHOLD_FACTOR
+   RECOGNITION_FLAG_ENABLE_AUDIO_ECHO_CANCELLATION
+   RECOGNITION_FLAG_ENABLE_AUDIO_NOISE_SUPPRESSION
-   STATE_KEYPHRASE_UNSUPPORTED
+   getParameter(I)I
+   getSupportedAudioCapabilities()I
+   queryParameter(I)LModelParamRange;
+   setParameter(II)I
```


```diff
+android/service/voice/AlwaysOnHotwordDetector$ModelParamRange
```


```diff
android/service/wallpaper/WallpaperService$Engine
+   onZoomChanged(F)V
```


```diff
android/speech/tts/TextToSpeech
+   synthesizeToFile(LCharSequence;LBundle;LParcelFileDescriptor;LString;)I
```


```diff
android/system/ErrnoException
+   rethrowAsIOException()LIOException;
+   rethrowAsSocketException()LSocketException;
```


```diff
android/system/Os
+   fcntlInt(LFileDescriptor;II)I
+   memfd_create(LString;I)LFileDescriptor;
```


```diff
android/system/OsConstants
+   MAP_ANONYMOUS
+   MFD_CLOEXEC
+   NETLINK_NETFILTER
```


```diff
android/telecom/Call
+   REJECT_REASON_DECLINED
+   REJECT_REASON_UNWANTED
+   STATE_AUDIO_PROCESSING
+   STATE_SIMULATED_RINGING
+   getGenericConferenceActiveChildCall()LCall;
+   reject(I)V
```


```diff
android/telecom/Call$Details
+   PROPERTY_ASSISTED_DIALING
+   getCallerNumberVerificationStatus()I
+   getContactDisplayName()LString;
```


```diff
android/telecom/Conference
+   getConnectionStartElapsedRealtimeMillis()J
+   sendConferenceEvent(LString;LBundle;)V
-   setConnectionStartElapsedRealTime(J)V
+   setConnectionStartElapsedRealtimeMillis(J)V
```


```diff
android/telecom/Connection
+   AUDIO_CODEC_AMR
+   AUDIO_CODEC_AMR_WB
+   AUDIO_CODEC_EVRC
+   AUDIO_CODEC_EVRC_B
+   AUDIO_CODEC_EVRC_NW
+   AUDIO_CODEC_EVRC_WB
+   AUDIO_CODEC_EVS_FB
+   AUDIO_CODEC_EVS_NB
+   AUDIO_CODEC_EVS_SWB
+   AUDIO_CODEC_EVS_WB
+   AUDIO_CODEC_G711A
+   AUDIO_CODEC_G711AB
+   AUDIO_CODEC_G711U
+   AUDIO_CODEC_G722
+   AUDIO_CODEC_G723
+   AUDIO_CODEC_G729
+   AUDIO_CODEC_GSM_EFR
+   AUDIO_CODEC_GSM_FR
+   AUDIO_CODEC_GSM_HR
+   AUDIO_CODEC_NONE
+   AUDIO_CODEC_QCELP13K
+   EVENT_CALL_HOLD_FAILED
+   EVENT_CALL_REMOTELY_HELD
+   EVENT_CALL_REMOTELY_UNHELD
+   EVENT_CALL_SWITCH_FAILED
+   EVENT_MERGE_COMPLETE
+   EVENT_MERGE_START
+   EVENT_ON_HOLD_TONE_END
+   EVENT_ON_HOLD_TONE_START
+   EXTRA_AUDIO_CODEC
+   PROPERTY_ASSISTED_DIALING
+   PROPERTY_HIGH_DEF_AUDIO
+   PROPERTY_NETWORK_IDENTIFIED_EMERGENCY_CALL
+   PROPERTY_WIFI
+   VERIFICATION_STATUS_FAILED
+   VERIFICATION_STATUS_NOT_VERIFIED
+   VERIFICATION_STATUS_PASSED
+   getCallerNumberVerificationStatus()I
+   getVideoState()I
+   notifyConferenceMergeFailed()V
+   onReject(I)V
+   setCallerNumberVerificationStatus(I)V
```


```diff
android/telecom/ConnectionRequest
+   getParticipants()LList;
+   isAdhocConferenceCall()Z
```


```diff
android/telecom/DisconnectCause
+   REASON_EMERGENCY_CALL_PLACED
```


```diff
android/telecom/PhoneAccount
+   CAPABILITY_ADHOC_CONFERENCE_CALLING
```


```diff
android/telecom/TelecomManager
+   ACTION_POST_CALL
+   DURATION_LONG
+   DURATION_MEDIUM
+   DURATION_SHORT
+   DURATION_VERY_SHORT
+   EXTRA_CALL_DURATION
+   EXTRA_DISCONNECT_CAUSE
+   EXTRA_HANDLE
+   EXTRA_USE_ASSISTED_DIALING
+   getSimCallManagerForSubscription(I)LPhoneAccountHandle;
```


```diff
android/telephony/AccessNetworkConstants
+   TRANSPORT_TYPE_WLAN
+   TRANSPORT_TYPE_WWAN
```


```diff
android/telephony/AccessNetworkConstants$AccessNetworkType
+   NGRAN
```


```diff
android/telephony/AccessNetworkConstants$EutranBand
+   BAND_49
+   BAND_50
+   BAND_51
+   BAND_52
+   BAND_53
+   BAND_71
+   BAND_72
+   BAND_73
+   BAND_74
+   BAND_85
+   BAND_87
+   BAND_88
```


```diff
+android/telephony/AccessNetworkConstants$NgranBands
```


```diff
android/telephony/AccessNetworkConstants$UtranBand
+   BAND_A
+   BAND_B
+   BAND_C
+   BAND_D
+   BAND_E
+   BAND_F
```


```diff
+android/telephony/BarringInfo
```


```diff
+android/telephony/BarringInfo$BarringServiceInfo
```


```diff
android/telephony/CarrierConfigManager
+   DATA_CYCLE_USE_PLATFORM_DEFAULT
+   ENABLE_EAP_METHOD_PREFIX_BOOL
+   IMSI_KEY_AVAILABILITY_INT
+   KEY_5G_NR_SSRSRP_THRESHOLDS_INT_ARRAY
+   KEY_5G_NR_SSRSRQ_THRESHOLDS_INT_ARRAY
+   KEY_5G_NR_SSSINR_THRESHOLDS_INT_ARRAY
+   KEY_ALLOW_HOLD_CALL_DURING_EMERGENCY_BOOL
+   KEY_ALLOW_HOLD_VIDEO_CALL_BOOL
+   KEY_ALLOW_VIDEO_CALLING_FALLBACK_BOOL
+   KEY_ALWAYS_SHOW_DATA_RAT_ICON_BOOL
-   KEY_ALWAYS_SHOW_EMERGENCY_ALERT_ONOFF_BOOL
+   KEY_ALWAYS_SHOW_PRIMARY_SIGNAL_BAR_IN_OPPORTUNISTIC_NETWORK_BOOLEAN
+   KEY_APN_SETTINGS_DEFAULT_APN_TYPES_STRING_ARRAY
+   KEY_CALL_REDIRECTION_SERVICE_COMPONENT_NAME_STRING
+   KEY_CARRIER_ALLOW_DEFLECT_IMS_CALL_BOOL
+   KEY_CARRIER_APP_REQUIRED_DURING_SIM_SETUP_BOOL
+   KEY_CARRIER_CERTIFICATE_STRING_ARRAY
+   KEY_CARRIER_CONFIG_APPLIED_BOOL
+   KEY_CARRIER_DEFAULT_ACTIONS_ON_DCFAILURE_STRING_ARRAY
+   KEY_CARRIER_DEFAULT_ACTIONS_ON_DEFAULT_NETWORK_AVAILABLE
+   KEY_CARRIER_DEFAULT_ACTIONS_ON_REDIRECTION_STRING_ARRAY
+   KEY_CARRIER_DEFAULT_ACTIONS_ON_RESET
+   KEY_CARRIER_DEFAULT_REDIRECTION_URL_STRING_ARRAY
+   KEY_CARRIER_DEFAULT_WFC_IMS_ENABLED_BOOL
-   KEY_CARRIER_FORCE_DISABLE_ETWS_CMAS_TEST_BOOL
+   KEY_CARRIER_RCS_PROVISIONING_REQUIRED_BOOL
+   KEY_CARRIER_SETTINGS_ACTIVITY_COMPONENT_NAME_STRING
+   KEY_CARRIER_VOLTE_OVERRIDE_WFC_PROVISIONING_BOOL
+   KEY_CHECK_PRICING_WITH_CARRIER_FOR_DATA_ROAMING_BOOL
+   KEY_CONFIG_IMS_MMTEL_PACKAGE_OVERRIDE_STRING
-   KEY_CONFIG_IMS_PACKAGE_OVERRIDE_STRING
+   KEY_CONFIG_IMS_RCS_PACKAGE_OVERRIDE_STRING
+   KEY_CONFIG_WIFI_DISABLE_IN_ECBM
+   KEY_DATA_LIMIT_NOTIFICATION_BOOL
+   KEY_DATA_RAPID_NOTIFICATION_BOOL
+   KEY_DATA_SWITCH_VALIDATION_TIMEOUT_LONG
+   KEY_DATA_WARNING_NOTIFICATION_BOOL
+   KEY_DEFAULT_VM_NUMBER_ROAMING_AND_IMS_UNREGISTERED_STRING
+   KEY_DISABLE_CHARGE_INDICATION_BOOL
+   KEY_DISABLE_SUPPLEMENTARY_SERVICES_IN_AIRPLANE_MODE_BOOL
+   KEY_DISCONNECT_CAUSE_PLAY_BUSYTONE_INT_ARRAY
+   KEY_EDITABLE_WFC_MODE_BOOL
+   KEY_EDITABLE_WFC_ROAMING_MODE_BOOL
+   KEY_EMERGENCY_NOTIFICATION_DELAY_INT
+   KEY_ENHANCED_4G_LTE_TITLE_VARIANT_INT
+   KEY_HIDE_LTE_PLUS_DATA_ICON_BOOL
+   KEY_IGNORE_DATA_ENABLED_CHANGED_FOR_VIDEO_CALLS
+   KEY_IGNORE_RTT_MODE_SETTING_BOOL
+   KEY_LTE_ENABLED_BOOL
+   KEY_LTE_RSRQ_THRESHOLDS_INT_ARRAY
+   KEY_LTE_RSSNR_THRESHOLDS_INT_ARRAY
+   KEY_MMS_CLOSE_CONNECTION_BOOL
+   KEY_ONLY_AUTO_SELECT_IN_HOME_NETWORK_BOOL
+   KEY_OPPORTUNISTIC_NETWORK_BACKOFF_TIME_LONG
+   KEY_OPPORTUNISTIC_NETWORK_DATA_SWITCH_EXIT_HYSTERESIS_TIME_LONG
+   KEY_OPPORTUNISTIC_NETWORK_MAX_BACKOFF_TIME_LONG
+   KEY_OPPORTUNISTIC_NETWORK_PING_PONG_TIME_LONG
+   KEY_PING_TEST_BEFORE_DATA_SWITCH_BOOL
+   KEY_PREVENT_CLIR_ACTIVATION_AND_DEACTIVATION_CODE_BOOL
+   KEY_READ_ONLY_APN_FIELDS_STRING_ARRAY
+   KEY_READ_ONLY_APN_TYPES_STRING_ARRAY
+   KEY_SHOW_4G_FOR_3G_DATA_ICON_BOOL
+   KEY_SHOW_4G_FOR_LTE_DATA_ICON_BOOL
+   KEY_SHOW_BLOCKING_PAY_PHONE_OPTION_BOOL
+   KEY_SHOW_FORWARDED_NUMBER_BOOL
+   KEY_SHOW_IMS_REGISTRATION_STATUS_BOOL
+   KEY_SHOW_VIDEO_CALL_CHARGES_ALERT_DIALOG_BOOL
+   KEY_SHOW_WFC_LOCATION_PRIVACY_POLICY_BOOL
+   KEY_SUPPORT_ENHANCED_CALL_BLOCKING_BOOL
+   KEY_SUPPORT_IMS_CONFERENCE_EVENT_PACKAGE_BOOL
+   KEY_SUPPORT_TDSCDMA_BOOL
+   KEY_SUPPORT_TDSCDMA_ROAMING_NETWORKS_STRING_ARRAY
+   KEY_SWITCH_DATA_TO_PRIMARY_IF_PRIMARY_IS_OOS_BOOL
+   KEY_UNLOGGABLE_NUMBERS_STRING_ARRAY
+   KEY_USE_RCS_SIP_OPTIONS_BOOL
+   KEY_USE_WFC_HOME_NETWORK_MODE_IN_ROAMING_NETWORK_BOOL
+   KEY_WFC_EMERGENCY_ADDRESS_CARRIER_APP_STRING
+   KEY_WORLD_MODE_ENABLED_BOOL
+   getConfigByComponentForSubId(LString;I)LPersistableBundle;
```


```diff
+android/telephony/CarrierConfigManager$Apn
```


```diff
+android/telephony/CarrierConfigManager$Gps
```


```diff
+android/telephony/CarrierConfigManager$Ims
```


```diff
android/telephony/CellIdentityGsm
+   getAdditionalPlmns()LSet;
```


```diff
android/telephony/CellIdentityLte
+   getAdditionalPlmns()LSet;
+   getBands()[I
+   getClosedSubscriberGroupInfo()LClosedSubscriberGroupInfo;
```


```diff
android/telephony/CellIdentityNr
+   getAdditionalPlmns()LSet;
+   getBands()[I
```


```diff
android/telephony/CellIdentityTdscdma
+   getAdditionalPlmns()LSet;
+   getClosedSubscriberGroupInfo()LClosedSubscriberGroupInfo;
```


```diff
android/telephony/CellIdentityWcdma
+   getAdditionalPlmns()LSet;
+   getClosedSubscriberGroupInfo()LClosedSubscriberGroupInfo;
```


```diff
android/telephony/CellInfo
+   getCellIdentity()LCellIdentity;
+   getCellSignalStrength()LCellSignalStrength;
-   getTimeStamp()J
+   getTimestampMillis()J
```


```diff
android/telephony/CellSignalStrengthGsm
+   getRssi()I
```


```diff
android/telephony/CellSignalStrengthWcdma
+   getEcNo()I
```


```diff
+android/telephony/ClosedSubscriberGroupInfo
```


```diff
+android/telephony/DataFailCause
```


```diff
+android/telephony/NetworkRegistrationInfo
```


```diff
android/telephony/PhoneStateListener
+   LISTEN_BARRING_INFO
+   LISTEN_CALL_DISCONNECT_CAUSES
+   LISTEN_DISPLAY_INFO_CHANGED
+   LISTEN_IMS_CALL_DISCONNECT_CAUSES
+   LISTEN_PRECISE_DATA_CONNECTION_STATE
+   LISTEN_REGISTRATION_FAILURE
+   onBarringInfoChanged(LBarringInfo;)V
+   onCallDisconnectCauseChanged(II)V
+   onDisplayInfoChanged(LTelephonyDisplayInfo;)V
+   onImsCallDisconnectCauseChanged(LImsReasonInfo;)V
+   onPreciseDataConnectionStateChanged(LPreciseDataConnectionState;)V
+   onRegistrationFailed(LCellIdentity;LString;III)V
```


```diff
+android/telephony/PreciseDataConnectionState
```


```diff
android/telephony/ServiceState
+   getNetworkRegistrationInfoList()LList;
+   isSearching()Z
```


```diff
android/telephony/SignalStrength
+   CREATOR
+   getTimestampMillis()J
```


```diff
android/telephony/SmsManager
+   RESULT_BLUETOOTH_DISCONNECTED
+   RESULT_CANCELLED
+   RESULT_ENCODING_ERROR
+   RESULT_ERROR_FDN_CHECK_FAILURE
+   RESULT_ERROR_NONE
+   RESULT_INTERNAL_ERROR
+   RESULT_INVALID_ARGUMENTS
+   RESULT_INVALID_BLUETOOTH_ADDRESS
+   RESULT_INVALID_SMSC_ADDRESS
+   RESULT_INVALID_SMS_FORMAT
+   RESULT_INVALID_STATE
+   RESULT_MODEM_ERROR
+   RESULT_NETWORK_ERROR
+   RESULT_NETWORK_REJECT
+   RESULT_NO_BLUETOOTH_SERVICE
+   RESULT_NO_DEFAULT_SMS_APP
+   RESULT_NO_MEMORY
+   RESULT_NO_RESOURCES
+   RESULT_OPERATION_NOT_ALLOWED
+   RESULT_RADIO_NOT_AVAILABLE
+   RESULT_RECEIVE_DISPATCH_FAILURE
+   RESULT_RECEIVE_INJECTED_NULL_PDU
+   RESULT_RECEIVE_NULL_MESSAGE_FROM_RIL
+   RESULT_RECEIVE_RUNTIME_EXCEPTION
+   RESULT_RECEIVE_SQL_EXCEPTION
+   RESULT_RECEIVE_URI_EXCEPTION
+   RESULT_RECEIVE_WHILE_ENCRYPTED
+   RESULT_REMOTE_EXCEPTION
+   RESULT_REQUEST_NOT_SUPPORTED
+   RESULT_RIL_CANCELLED
+   RESULT_RIL_ENCODING_ERR
+   RESULT_RIL_INTERNAL_ERR
+   RESULT_RIL_INVALID_ARGUMENTS
+   RESULT_RIL_INVALID_MODEM_STATE
+   RESULT_RIL_INVALID_SMSC_ADDRESS
+   RESULT_RIL_INVALID_SMS_FORMAT
+   RESULT_RIL_INVALID_STATE
+   RESULT_RIL_MODEM_ERR
+   RESULT_RIL_NETWORK_ERR
+   RESULT_RIL_NETWORK_NOT_READY
+   RESULT_RIL_NETWORK_REJECT
+   RESULT_RIL_NO_MEMORY
+   RESULT_RIL_NO_RESOURCES
+   RESULT_RIL_OPERATION_NOT_ALLOWED
+   RESULT_RIL_RADIO_NOT_AVAILABLE
+   RESULT_RIL_REQUEST_NOT_SUPPORTED
+   RESULT_RIL_REQUEST_RATE_LIMITED
+   RESULT_RIL_SIM_ABSENT
+   RESULT_RIL_SMS_SEND_FAIL_RETRY
+   RESULT_RIL_SYSTEM_ERR
+   RESULT_SMS_BLOCKED_DURING_EMERGENCY
+   RESULT_SMS_SEND_RETRY_FAILED
+   RESULT_SYSTEM_ERROR
+   RESULT_UNEXPECTED_EVENT_STOP_SENDING
+   getSmscAddress()LString;
+   sendMultipartTextMessage(LString;LString;LList;LList;LList;J)V
+   sendMultipartTextMessage(LString;LString;LList;LList;LList;LString;LString;)V
+   sendTextMessage(LString;LString;LString;LPendingIntent;LPendingIntent;J)V
+   setSmscAddress(LString;)Z
```


```diff
android/telephony/SubscriptionManager
+   EXTRA_SLOT_INDEX
+   addOnSubscriptionsChangedListener(LExecutor;LOnSubscriptionsChangedListener;)V
+   getActiveDataSubscriptionId()I
+   getCompleteActiveSubscriptionInfoList()LList;
```


```diff
android/telephony/SubscriptionPlan
+   getNetworkTypes()[I
```


```diff
android/telephony/SubscriptionPlan$Builder
+   resetNetworkTypes()LBuilder;
+   setNetworkTypes([I)LBuilder;
```


```diff
+android/telephony/TelephonyDisplayInfo
```


```diff
android/telephony/TelephonyManager
+   ACTION_MULTI_SIM_CONFIG_CHANGED
+   DATA_DISCONNECTING
+   EXTRA_ACTIVE_SIM_SUPPORTED_COUNT
+   NETWORK_SELECTION_MODE_AUTO
+   NETWORK_SELECTION_MODE_MANUAL
+   NETWORK_SELECTION_MODE_UNKNOWN
+   SET_OPPORTUNISTIC_SUB_NO_OPPORTUNISTIC_SUB_AVAILABLE
+   SET_OPPORTUNISTIC_SUB_REMOTE_SERVICE_EXCEPTION
+   UPDATE_AVAILABLE_NETWORKS_DISABLE_MODEM_FAIL
+   UPDATE_AVAILABLE_NETWORKS_ENABLE_MODEM_FAIL
+   UPDATE_AVAILABLE_NETWORKS_MULTIPLE_NETWORKS_NOT_SUPPORTED
+   UPDATE_AVAILABLE_NETWORKS_NO_OPPORTUNISTIC_SUB_AVAILABLE
+   UPDATE_AVAILABLE_NETWORKS_REMOTE_SERVICE_EXCEPTION
+   UPDATE_AVAILABLE_NETWORKS_SERVICE_IS_DISABLED
+   getActiveModemCount()I
+   getManualNetworkSelectionPlmn()LString;
+   getNetworkCountryIso(I)LString;
+   getNetworkSelectionMode()I
-   getNetworkType()I
-   getPhoneCount()I
+   getSubscriptionId()I
+   getSubscriptionId(LPhoneAccountHandle;)I
+   getSupportedModemCount()I
-   iccCloseLogicalChannel(I)Z
-   iccExchangeSimIO(IIIIILString;)[B
-   iccOpenLogicalChannel(LString;I)LIccOpenLogicalChannelResponse;
-   iccTransmitApduBasicChannel(IIIIILString;)LString;
-   iccTransmitApduLogicalChannel(IIIIIILString;)LString;
+   isManualNetworkSelectionAllowed()Z
+   isModemEnabledForSlot(I)Z
-   sendEnvelopeWithStatus(LString;)LString;
+   setForbiddenPlmns(LList;)I
+   setNetworkSelectionModeManual(LString;ZI)Z
```


```diff
android/telephony/data/ApnSetting
+   TYPE_XCAP
```


```diff
android/telephony/euicc/EuiccManager
+   ACTION_START_EUICC_ACTIVATION
+   ERROR_ADDRESS_MISSING
+   ERROR_CARRIER_LOCKED
+   ERROR_CERTIFICATE_ERROR
+   ERROR_CONNECTION_ERROR
+   ERROR_DISALLOWED_BY_PPR
+   ERROR_EUICC_INSUFFICIENT_MEMORY
+   ERROR_EUICC_MISSING
+   ERROR_INCOMPATIBLE_CARRIER
+   ERROR_INSTALL_PROFILE
+   ERROR_INVALID_ACTIVATION_CODE
+   ERROR_INVALID_CONFIRMATION_CODE
+   ERROR_INVALID_RESPONSE
+   ERROR_NO_PROFILES_AVAILABLE
+   ERROR_OPERATION_BUSY
+   ERROR_SIM_MISSING
+   ERROR_TIME_OUT
+   ERROR_UNSUPPORTED_VERSION
+   EXTRA_EMBEDDED_SUBSCRIPTION_ERROR_CODE
+   EXTRA_EMBEDDED_SUBSCRIPTION_OPERATION_CODE
+   EXTRA_EMBEDDED_SUBSCRIPTION_SMDX_REASON_CODE
+   EXTRA_EMBEDDED_SUBSCRIPTION_SMDX_SUBJECT_CODE
+   EXTRA_USE_QR_SCANNER
+   OPERATION_APDU
+   OPERATION_DOWNLOAD
+   OPERATION_EUICC_CARD
+   OPERATION_EUICC_GSMA
+   OPERATION_HTTP
+   OPERATION_METADATA
+   OPERATION_SIM_SLOT
+   OPERATION_SMDX
+   OPERATION_SMDX_SUBJECT_REASON_CODE
+   OPERATION_SWITCH
+   OPERATION_SYSTEM
```


```diff
+android/telephony/ims/ImsException
```


```diff
+android/telephony/ims/ImsManager
```


```diff
+android/telephony/ims/ImsMmTelManager
```


```diff
+android/telephony/ims/ImsMmTelManager$CapabilityCallback
```


```diff
+android/telephony/ims/ImsRcsManager
```


```diff
+android/telephony/ims/ImsReasonInfo
```


```diff
+android/telephony/ims/RcsUceAdapter
```


```diff
+android/telephony/ims/RegistrationManager
```


```diff
+android/telephony/ims/RegistrationManager$RegistrationCallback
```


```diff
+android/telephony/ims/feature/MmTelFeature
```


```diff
+android/telephony/ims/feature/MmTelFeature$MmTelCapabilities
```


```diff
-android/text/AlteredCharSequence
-   make(LCharSequence;[CII)LAlteredCharSequence;
```


```diff
-android/text/LoginFilter
-   isAllowed(C)Z
-   onInvalidCharacter(C)V
-   onStart()V
-   onStop()V
```


```diff
-android/text/LoginFilter$PasswordFilterGMail
-   <init>()V
-   <init>(Z)V
```


```diff
-android/text/LoginFilter$UsernameFilterGMail
-   <init>()V
-   <init>(Z)V
```


```diff
-android/text/LoginFilter$UsernameFilterGeneric
-   <init>()V
-   <init>(Z)V
```


```diff
android/text/format/DateUtils
-   YEAR_IN_MILLIS
```


```diff
android/text/style/ReplacementSpan
+   getContentDescription()LCharSequence;
+   setContentDescription(LCharSequence;)V
```


```diff
android/util/ArraySet
+   <init>([LObject;)V
```


```diff
+android/util/CloseGuard
```


```diff
android/util/SparseArray
+   contains(I)Z
```


```diff
android/util/TimeUtils
+   isTimeBetween(LLocalTime;LLocalTime;LLocalTime;)Z
```


```diff
-android/util/TimingLogger
-   <init>(LString;LString;)V
-   addSplit(LString;)V
-   dumpToLog()V
-   reset()V
-   reset(LString;LString;)V
```


```diff
+android/util/proto/ProtoOutputStream
```


```diff
android/view/Display
-   getMetrics(LDisplayMetrics;)V
-   getRectSize(LRect;)V
-   getSize(LPoint;)V
+   isMinimalPostProcessingSupported()Z
```


```diff
android/view/DisplayCutout
+   <init>(LInsets;LRect;LRect;LRect;LRect;LInsets;)V
+   getWaterfallInsets()LInsets;
```


```diff
android/view/HapticFeedbackConstants
+   CONFIRM
+   GESTURE_END
+   GESTURE_START
+   REJECT
```


```diff
android/view/Surface
+   FRAME_RATE_COMPATIBILITY_DEFAULT
+   FRAME_RATE_COMPATIBILITY_FIXED_SOURCE
+   setFrameRate(FI)V
```


```diff
android/view/SurfaceControl$Transaction
+   CREATOR
+   setFrameRate(LSurfaceControl;FI)LTransaction;
```


```diff
+android/view/SurfaceControlViewHost
```


```diff
+android/view/SurfaceControlViewHost$SurfacePackage
```


```diff
android/view/SurfaceView
+   getHostToken()LIBinder;
+   setChildSurfacePackage(LSurfacePackage;)V
```


```diff
+android/view/VerifiedInputEvent
```


```diff
+android/view/VerifiedKeyEvent
```


```diff
+android/view/VerifiedMotionEvent
```


```diff
android/view/View
+   IMPORTANT_FOR_CONTENT_CAPTURE_AUTO
+   IMPORTANT_FOR_CONTENT_CAPTURE_NO
+   IMPORTANT_FOR_CONTENT_CAPTURE_NO_EXCLUDE_DESCENDANTS
+   IMPORTANT_FOR_CONTENT_CAPTURE_YES
+   IMPORTANT_FOR_CONTENT_CAPTURE_YES_EXCLUDE_DESCENDANTS
-   SYSTEM_UI_FLAG_FULLSCREEN
-   SYSTEM_UI_FLAG_HIDE_NAVIGATION
-   SYSTEM_UI_FLAG_IMMERSIVE
-   SYSTEM_UI_FLAG_IMMERSIVE_STICKY
-   SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
-   SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
-   SYSTEM_UI_FLAG_LAYOUT_STABLE
-   SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
-   SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
-   SYSTEM_UI_FLAG_LOW_PROFILE
-   SYSTEM_UI_FLAG_VISIBLE
-   SYSTEM_UI_LAYOUT_FLAGS
-   dispatchSystemUiVisibilityChanged(I)V
+   dispatchWindowInsetsAnimationEnd(LWindowInsetsAnimation;)V
+   dispatchWindowInsetsAnimationPrepare(LWindowInsetsAnimation;)V
+   dispatchWindowInsetsAnimationProgress(LWindowInsets;LList;)LWindowInsets;
+   dispatchWindowInsetsAnimationStart(LWindowInsetsAnimation;LBounds;)LBounds;
-   dispatchWindowSystemUiVisiblityChanged(I)V
+   getImportantForContentCapture()I
+   getStateDescription()LCharSequence;
-   getSystemUiVisibility()I
+   getWindowInsetsController()LWindowInsetsController;
-   getWindowSystemUiVisibility()I
+   hasOnLongClickListeners()Z
+   isImportantForContentCapture()Z
+   isShowingLayoutBounds()Z
+   onProvideContentCaptureStructure(LViewStructure;I)V
-   onWindowSystemUiVisibilityChanged(I)V
+   requestUnbufferedDispatch(I)V
+   setImportantForContentCapture(I)V
-   setOnSystemUiVisibilityChangeListener(LOnSystemUiVisibilityChangeListener;)V
+   setStateDescription(LCharSequence;)V
-   setSystemUiVisibility(I)V
+   setWindowInsetsAnimationCallback(LCallback;)V
```


```diff
-android/view/View$OnSystemUiVisibilityChangeListener
-   onSystemUiVisibilityChange(I)V
```


```diff
android/view/ViewConfiguration
-   getAmbiguousGestureMultiplier()F
+   getScaledAmbiguousGestureMultiplier()F
```


```diff
android/view/ViewStructure
+   setHintIdEntry(LString;)V
```


```diff
android/view/Window
-   FEATURE_SWIPE_TO_DISMISS
+   getInsetsController()LWindowInsetsController;
+   setDecorFitsSystemWindows(Z)V
+   setPreferMinimalPostProcessing(Z)V
```


```diff
android/view/WindowInsets
+   CONSUMED
-   consumeDisplayCutout()LWindowInsets;
-   consumeStableInsets()LWindowInsets;
-   consumeSystemWindowInsets()LWindowInsets;
+   getInsets(I)LInsets;
+   getInsetsIgnoringVisibility(I)LInsets;
-   getMandatorySystemGestureInsets()LInsets;
-   getStableInsetBottom()I
-   getStableInsetLeft()I
-   getStableInsetRight()I
-   getStableInsetTop()I
-   getStableInsets()LInsets;
-   getSystemGestureInsets()LInsets;
-   getSystemWindowInsetBottom()I
-   getSystemWindowInsetLeft()I
-   getSystemWindowInsetRight()I
-   getSystemWindowInsetTop()I
-   getSystemWindowInsets()LInsets;
-   getTappableElementInsets()LInsets;
-   hasStableInsets()Z
-   hasSystemWindowInsets()Z
+   inset(LInsets;)LWindowInsets;
+   isVisible(I)Z
```


```diff
android/view/WindowInsets$Builder
+   setInsets(ILInsets;)LBuilder;
+   setInsetsIgnoringVisibility(ILInsets;)LBuilder;
-   setMandatorySystemGestureInsets(LInsets;)LBuilder;
-   setStableInsets(LInsets;)LBuilder;
-   setSystemGestureInsets(LInsets;)LBuilder;
-   setSystemWindowInsets(LInsets;)LBuilder;
-   setTappableElementInsets(LInsets;)LBuilder;
+   setVisible(IZ)LBuilder;
```


```diff
+android/view/WindowInsets$Side
```


```diff
+android/view/WindowInsets$Type
```


```diff
+android/view/WindowInsetsAnimation
```


```diff
+android/view/WindowInsetsAnimation$Bounds
```


```diff
+android/view/WindowInsetsAnimation$Callback
```


```diff
+android/view/WindowInsetsAnimationControlListener
```


```diff
+android/view/WindowInsetsAnimationController
```


```diff
+android/view/WindowInsetsController
```


```diff
+android/view/WindowInsetsController$OnControllableInsetsChangedListener
```


```diff
android/view/WindowManager
+   getCurrentWindowMetrics()LWindowMetrics;
-   getDefaultDisplay()LDisplay;
+   getMaximumWindowMetrics()LWindowMetrics;
```


```diff
android/view/WindowManager$LayoutParams
-   FLAG_FORCE_NOT_FULLSCREEN
-   FLAG_FULLSCREEN
-   FLAG_LAYOUT_ATTACHED_IN_DECOR
-   FLAG_LAYOUT_INSET_DECOR
-   FLAG_LAYOUT_IN_OVERSCAN
-   FLAG_TRANSLUCENT_NAVIGATION
-   FLAG_TRANSLUCENT_STATUS
+   LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS
-   SOFT_INPUT_ADJUST_RESIZE
-   TYPE_STATUS_BAR_PANEL
+   preferMinimalPostProcessing
-   systemUiVisibility
+   getFitInsetsSides()I
+   getFitInsetsTypes()I
+   isFitInsetsIgnoringVisibility()Z
+   setFitInsetsIgnoringVisibility(Z)V
+   setFitInsetsSides(I)V
+   setFitInsetsTypes(I)V
```


```diff
+android/view/WindowMetrics
```


```diff
android/view/accessibility/AccessibilityEvent
+   CONTENT_CHANGE_TYPE_STATE_DESCRIPTION
+   <init>()V
+   <init>(I)V
+   <init>(LAccessibilityEvent;)V
```


```diff
android/view/accessibility/AccessibilityNodeInfo
+   ACTION_ARGUMENT_PRESS_AND_HOLD_DURATION_MILLIS_INT
+   EXTRA_DATA_RENDERING_INFO_KEY
+   <init>()V
+   <init>(LAccessibilityNodeInfo;)V
+   <init>(LView;)V
+   <init>(LView;I)V
+   getExtraRenderingInfo()LExtraRenderingInfo;
+   getStateDescription()LCharSequence;
+   setStateDescription(LCharSequence;)V
```


```diff
android/view/accessibility/AccessibilityNodeInfo$AccessibilityAction
+   ACTION_IME_ENTER
+   ACTION_PRESS_AND_HOLD
+   CREATOR
```


```diff
android/view/accessibility/AccessibilityNodeInfo$CollectionInfo
+   <init>(IIZ)V
+   <init>(IIZI)V
```


```diff
android/view/accessibility/AccessibilityNodeInfo$CollectionItemInfo
+   <init>(IIIIZ)V
+   <init>(IIIIZZ)V
```


```diff
+android/view/accessibility/AccessibilityNodeInfo$ExtraRenderingInfo
```


```diff
android/view/accessibility/AccessibilityNodeInfo$RangeInfo
+   <init>(IFFF)V
```


```diff
android/view/accessibility/AccessibilityRecord
+   <init>()V
+   <init>(LAccessibilityRecord;)V
```


```diff
android/view/accessibility/AccessibilityWindowInfo
+   <init>()V
+   <init>(LAccessibilityWindowInfo;)V
+   getDisplayId()I
+   getRegionInScreen(LRegion;)V
```


```diff
android/view/animation/Animation
-   getBackgroundColor()I
-   setBackgroundColor(I)V
```


```diff
android/view/contentcapture/ContentCaptureManager
+   DATA_SHARE_ERROR_CONCURRENT_REQUEST
+   DATA_SHARE_ERROR_TIMEOUT_INTERRUPTED
+   DATA_SHARE_ERROR_UNKNOWN
+   shareData(LDataShareRequest;LExecutor;LDataShareWriteAdapter;)V
```


```diff
android/view/contentcapture/ContentCaptureSession
+   notifySessionPaused()V
+   notifySessionResumed()V
+   notifyViewInsetsChanged(LInsets;)V
```


```diff
+android/view/contentcapture/DataShareRequest
```


```diff
+android/view/contentcapture/DataShareWriteAdapter
```


```diff
android/view/inputmethod/EditorInfo
+   getInitialSelectedText(I)LCharSequence;
+   getInitialTextAfterCursor(II)LCharSequence;
+   getInitialTextBeforeCursor(II)LCharSequence;
+   setInitialSurroundingSubText(LCharSequence;I)V
+   setInitialSurroundingText(LCharSequence;)V
```


```diff
+android/view/inputmethod/InlineSuggestion
```


```diff
+android/view/inputmethod/InlineSuggestionInfo
```


```diff
+android/view/inputmethod/InlineSuggestionsRequest
```


```diff
+android/view/inputmethod/InlineSuggestionsRequest$Builder
```


```diff
+android/view/inputmethod/InlineSuggestionsResponse
```


```diff
android/view/textclassifier/TextClassificationSessionId
+   getValue()LString;
```


```diff
android/view/textclassifier/TextClassifierEvent
+   TYPE_LINKS_GENERATED
```


```diff
android/view/textclassifier/TextLinks
+   getText()LCharSequence;
```


```diff
android/view/textclassifier/TextLinks$Request
+   getReferenceTime()LZonedDateTime;
```


```diff
android/view/textclassifier/TextLinks$Request$Builder
+   setReferenceTime(LZonedDateTime;)Landroid/view/textclassifier/TextLinks$Request$Builder;
```


```diff
android/webkit/CookieManager
-   setAcceptFileSchemeCookies(Z)V
```


```diff
android/webkit/WebSettings
-   setAllowFileAccessFromFileURLs(Z)V
-   setAllowUniversalAccessFromFileURLs(Z)V
-   setAppCacheEnabled(Z)V
-   setAppCachePath(LString;)V
```


```diff
-android/widget/TabHost
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   addTab(LTabSpec;)V
-   clearAllTabs()V
-   getCurrentTab()I
-   getCurrentTabTag()LString;
-   getCurrentTabView()LView;
-   getCurrentView()LView;
-   getTabContentView()LFrameLayout;
-   getTabWidget()LTabWidget;
-   newTabSpec(LString;)LTabSpec;
-   setCurrentTab(I)V
-   setCurrentTabByTag(LString;)V
-   setOnTabChangedListener(LOnTabChangeListener;)V
-   setup()V
-   setup(LLocalActivityManager;)V
```


```diff
-android/widget/TabHost$OnTabChangeListener
-   onTabChanged(LString;)V
```


```diff
-android/widget/TabHost$TabContentFactory
-   createTabContent(LString;)LView;
```


```diff
-android/widget/TabHost$TabSpec
-   getTag()LString;
-   setContent(I)LTabSpec;
-   setContent(LIntent;)LTabSpec;
-   setContent(LTabContentFactory;)LTabSpec;
-   setIndicator(LCharSequence;)LTabSpec;
-   setIndicator(LCharSequence;LDrawable;)LTabSpec;
-   setIndicator(LView;)LTabSpec;
```


```diff
-android/widget/TabWidget
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   focusCurrentTab(I)V
-   getChildTabViewAt(I)LView;
-   getLeftStripDrawable()LDrawable;
-   getRightStripDrawable()LDrawable;
-   getTabCount()I
-   isStripEnabled()Z
-   setCurrentTab(I)V
-   setDividerDrawable(I)V
-   setDividerDrawable(LDrawable;)V
-   setLeftStripDrawable(I)V
-   setLeftStripDrawable(LDrawable;)V
-   setRightStripDrawable(I)V
-   setRightStripDrawable(LDrawable;)V
-   setStripEnabled(Z)V
```


```diff
android/widget/TextClock
+   refreshTime()V
```


```diff
android/widget/TextView
+   getTextSizeUnit()I
```


```diff
android/widget/Toast
+   addCallback(LCallback;)V
-   getView()LView;
+   removeCallback(LCallback;)V
-   setView(LView;)V
```


```diff
+android/widget/Toast$Callback
```


```diff
+android/widget/inline/InlineContentView
```


```diff
+android/widget/inline/InlineContentView$SurfaceControlCallback
```


```diff
+android/widget/inline/InlinePresentationSpec
```


```diff
+android/widget/inline/InlinePresentationSpec$Builder
```


```diff
java/time/chrono/JapaneseEra
+   REIWA
```


```diff
java/util/List
+   of()LList;
+   of(LObject;)LList;
+   of(LObject;LObject;)LList;
+   of(LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LList;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LList;
+   of([LObject;)LList;
```


```diff
java/util/Map
+   entry(LObject;LObject;)LEntry;
+   of()LMap;
+   of(LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LMap;
+   ofEntries([LEntry;)LMap;
```


```diff
java/util/Objects
+   checkFromIndexSize(III)I
+   checkFromToIndex(III)I
+   checkIndex(II)I
+   requireNonNullElse(LObject;LObject;)LObject;
+   requireNonNullElseGet(LObject;LSupplier;)LObject;
```


```diff
java/util/Set
+   of()LSet;
+   of(LObject;)LSet;
+   of(LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LSet;
+   of(LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;LObject;)LSet;
+   of([LObject;)LSet;
```


```diff
+java/util/concurrent/Flow
```


```diff
+java/util/concurrent/Flow$Processor
```


```diff
+java/util/concurrent/Flow$Publisher
```


```diff
+java/util/concurrent/Flow$Subscriber
```


```diff
+java/util/concurrent/Flow$Subscription
```
