---
title: Android 10 API changes
---

With the latest [Enhance] update to support Android 10 I decided to extract API changes
that had happened on the public surface - what classes/fields/methods 
were added or deprecated (sometimes both! - search for the `-+` sequence).

[Enhance]: https://github.com/noties/Enhance

There are few things that I had noticed:
* Activity, View and TextView are still growing, great!
* There are 11 entities that were both added and deprecated in Android 10 (again &mdash; `-+` to look up)
* There are newly deprecated methods inside already deprecated classes (for example `Fragment` was deprecated in Pie (28), but all of its' methods are deprecated in Android 10)
* Deprecation of `android.preference.*` (it seems that the main _user_ of this package was system `Settings` app, what will it use instead - `androidx` artifact 🤔?)
* `NetworkInfo` is deprecated (and so as a quick way to check if a device has a network connection - [NetworkCallback](https://developer.android.com/reference/android/net/ConnectivityManager.NetworkCallback) must be used instead, which doesn't seem very convenient)
* `Build.VERSION_CODES.Q` is there (check out the javadoc!)
* `DynamicDrawableSpan.ALIGN_CENTER`! Previously only `ALIGN_BOTTOM` and `ALIGN_BASELINE` were available

So, here is the gist of API changes in Android 10:

```diff
android/Manifest$permission
+   ACCESS_BACKGROUND_LOCATION
+   ACCESS_MEDIA_LOCATION
+   ACTIVITY_RECOGNITION
+   BIND_CALL_REDIRECTION_SERVICE
+   BIND_CARRIER_MESSAGING_CLIENT_SERVICE
+   CALL_COMPANION_APP
-   PROCESS_OUTGOING_CALLS
+   REQUEST_PASSWORD_COMPLEXITY
+   SMS_FINANCIAL_TRANSACTIONS
+   START_VIEW_PERMISSION_USAGE
+   USE_FULL_SCREEN_INTENT
```

<p $excerpt></p>


```diff
android/Manifest$permission_group
+   ACTIVITY_RECOGNITION
```


```diff
android/R$attr
+   allowAudioPlaybackCapture
-   codes
+   enforceNavigationBarContrast
+   enforceStatusBarContrast
+   forceDarkAllowed
+   forceUriPermissions
+   foregroundServiceType
+   hasFragileUserData
-   horizontalGap
-   iconPreview
+   identifier
+   inheritShowWhenLocked
+   interactiveUiTimeout
+   isLightTheme
-   isModifier
-   isRepeatable
+   isSplitRequired
-   isSticky
-   keyBackground
-   keyEdgeFlags
-   keyHeight
-   keyIcon
-   keyLabel
-   keyOutputText
-   keyPreviewHeight
-   keyPreviewLayout
-   keyPreviewOffset
-   keyTextColor
-   keyTextSize
-   keyWidth
-   keyboardMode
-   labelTextSize
+   minAspectRatio
+   nonInteractiveUiTimeout
+   opticalInsetBottom
+   opticalInsetLeft
+   opticalInsetRight
+   opticalInsetTop
+   packageType
-   popupCharacters
-   popupKeyboard
-   popupLayout
+   requestLegacyExternalStorage
-   rowEdgeFlags
+   secureElementName
+   selectionDividerHeight
+   settingsSliceUri
-   sharedUserId
-   sharedUserLabel
+   shell
-   state_long_pressable
+   supportsMultipleDisplays
-   targetSandboxVersion
+   textLocale
+   useAppZygote
+   useEmbeddedDex
-   verticalCorrection
-   verticalGap
+   zygotePreloadName
```


```diff
android/R$id
+   accessibilityActionPageDown
+   accessibilityActionPageLeft
+   accessibilityActionPageRight
+   accessibilityActionPageUp
-   keyboardView
```


```diff
android/R$style
+   ThemeOverlay_DeviceDefault_Accent_DayNight
+   Theme_DeviceDefault_DayNight
-   Widget_KeyboardView
```


```diff
android/accessibilityservice/AccessibilityService
+   SHOW_MODE_IGNORE_HARD_KEYBOARD
```


```diff
android/accessibilityservice/AccessibilityServiceInfo
+   FLAG_REQUEST_SHORTCUT_WARNING_DIALOG_SPOKEN_FEEDBACK
+   getInteractiveUiTimeoutMillis()I
+   getNonInteractiveUiTimeoutMillis()I
+   setInteractiveUiTimeoutMillis(I)V
+   setNonInteractiveUiTimeoutMillis(I)V
```


```diff
android/app/ActionBar$OnNavigationListener
-   onNavigationItemSelected(IJ)Z
```


```diff
android/app/ActionBar$Tab
-   INVALID_POSITION
-   <init>()V
-   getContentDescription()LCharSequence;
-   getCustomView()LView;
-   getIcon()LDrawable;
-   getPosition()I
-   getTag()LObject;
-   getText()LCharSequence;
-   select()V
-   setContentDescription(I)LTab;
-   setContentDescription(LCharSequence;)LTab;
-   setCustomView(I)LTab;
-   setCustomView(LView;)LTab;
-   setIcon(I)LTab;
-   setIcon(LDrawable;)LTab;
-   setTabListener(LTabListener;)LTab;
-   setTag(LObject;)LTab;
-   setText(I)LTab;
-   setText(LCharSequence;)LTab;
```


```diff
android/app/ActionBar$TabListener
-   onTabReselected(LTab;LFragmentTransaction;)V
-   onTabSelected(LTab;LFragmentTransaction;)V
-   onTabUnselected(LTab;LFragmentTransaction;)V
```


```diff
android/app/Activity
+   onGetDirectActions(LCancellationSignal;LConsumer;)V
+   onPerformDirectAction(LString;LBundle;LCancellationSignal;LConsumer;)V
-   onStateNotSaved()V
+   onTopResumedActivityChanged(Z)V
+   registerActivityLifecycleCallbacks(LActivityLifecycleCallbacks;)V
+   setInheritShowWhenLocked(Z)V
+   unregisterActivityLifecycleCallbacks(LActivityLifecycleCallbacks;)V
```


```diff
android/app/ActivityGroup
-   <init>()V
-   <init>(Z)V
-   getCurrentActivity()LActivity;
-   getLocalActivityManager()LLocalActivityManager;
```


```diff
android/app/ActivityManager
+   isActivityStartAllowedOnDisplay(LContext;ILIntent;)Z
-   isRunningInTestHarness()Z
+   isRunningInUserTestHarness()Z
```


```diff
android/app/ActivityManager$RecentTaskInfo
-   affiliatedTaskId
-   description
-   id
-   persistentId
```


```diff
android/app/ActivityManager$RunningTaskInfo
-   description
-   id
-   numRunning
-   thumbnail
```


```diff
android/app/AppComponentFactory
+   instantiateClassLoader(LClassLoader;LApplicationInfo;)LClassLoader;
```


```diff
android/app/AppOpsManager
+   MODE_FOREGROUND
+   WATCH_FOREGROUND_CHANGES
-   checkOp(LString;ILString;)I
-   checkOpNoThrow(LString;ILString;)I
+   noteProxyOpNoThrow(LString;LString;I)I
+   startWatchingMode(LString;LString;ILOnOpChangedListener;)V
+   unsafeCheckOp(LString;ILString;)I
+   unsafeCheckOpNoThrow(LString;ILString;)I
+   unsafeCheckOpRaw(LString;ILString;)I
+   unsafeCheckOpRawNoThrow(LString;ILString;)I
```


```diff
android/app/Application$ActivityLifecycleCallbacks
+   onActivityPostCreated(LActivity;LBundle;)V
+   onActivityPostDestroyed(LActivity;)V
+   onActivityPostPaused(LActivity;)V
+   onActivityPostResumed(LActivity;)V
+   onActivityPostSaveInstanceState(LActivity;LBundle;)V
+   onActivityPostStarted(LActivity;)V
+   onActivityPostStopped(LActivity;)V
+   onActivityPreCreated(LActivity;LBundle;)V
+   onActivityPreDestroyed(LActivity;)V
+   onActivityPrePaused(LActivity;)V
+   onActivityPreResumed(LActivity;)V
+   onActivityPreSaveInstanceState(LActivity;LBundle;)V
+   onActivityPreStarted(LActivity;)V
+   onActivityPreStopped(LActivity;)V
```


```diff
android/app/AutomaticZenRule
+   <init>(LString;LComponentName;LComponentName;LUri;LZenPolicy;IZ)V
-   <init>(LString;LComponentName;LUri;IZ)V
+   getConfigurationActivity()LComponentName;
+   getZenPolicy()LZenPolicy;
+   setConfigurationActivity(LComponentName;)V
+   setZenPolicy(LZenPolicy;)V
```


```diff
android/app/DialogFragment
-   STYLE_NORMAL
-   STYLE_NO_FRAME
-   STYLE_NO_INPUT
-   STYLE_NO_TITLE
-   <init>()V
-   dismiss()V
-   dismissAllowingStateLoss()V
-   getDialog()LDialog;
-   getShowsDialog()Z
-   getTheme()I
-   isCancelable()Z
-   onCreateDialog(LBundle;)LDialog;
-   setCancelable(Z)V
-   setShowsDialog(Z)V
-   setStyle(II)V
-   show(LFragmentManager;LString;)V
-   show(LFragmentTransaction;LString;)I
```


```diff
+android/app/DirectAction
```


```diff
+android/app/DirectAction$Builder
```


```diff
android/app/DownloadManager
-   addCompletedDownload(LString;LString;ZLString;LString;JZ)J
-   addCompletedDownload(LString;LString;ZLString;LString;JZLUri;LUri;)J
```


```diff
android/app/DownloadManager$Request
-   allowScanningByMediaScanner()V
-   setVisibleInDownloadsUi(Z)LRequest;
```


```diff
android/app/Fragment
-   <init>()V
-   dump(LString;LFileDescriptor;LPrintWriter;[LString;)V
-   getActivity()LActivity;
-   getAllowEnterTransitionOverlap()Z
-   getAllowReturnTransitionOverlap()Z
-   getArguments()LBundle;
-   getChildFragmentManager()LFragmentManager;
-   getContext()LContext;
-   getEnterTransition()LTransition;
-   getExitTransition()LTransition;
-   getFragmentManager()LFragmentManager;
-   getHost()LObject;
-   getId()I
-   getLayoutInflater()LLayoutInflater;
-   getParentFragment()LFragment;
-   getReenterTransition()LTransition;
-   getResources()LResources;
-   getRetainInstance()Z
-   getReturnTransition()LTransition;
-   getSharedElementEnterTransition()LTransition;
-   getSharedElementReturnTransition()LTransition;
-   getString(I)LString;
-   getString(I[LObject;)LString;
-   getTag()LString;
-   getTargetFragment()LFragment;
-   getTargetRequestCode()I
-   getText(I)LCharSequence;
-   getUserVisibleHint()Z
-   getView()LView;
-   instantiate(LContext;LString;)LFragment;
-   instantiate(LContext;LString;LBundle;)LFragment;
-   isAdded()Z
-   isDetached()Z
-   isHidden()Z
-   isInLayout()Z
-   isRemoving()Z
-   isResumed()Z
-   isStateSaved()Z
-   isVisible()Z
-   onActivityCreated(LBundle;)V
-   onActivityResult(IILIntent;)V
-   onAttach(LContext;)V
-   onAttachFragment(LFragment;)V
-   onContextItemSelected(LMenuItem;)Z
-   onCreate(LBundle;)V
-   onCreateAnimator(IZI)LAnimator;
-   onCreateOptionsMenu(LMenu;LMenuInflater;)V
-   onCreateView(LLayoutInflater;LViewGroup;LBundle;)LView;
-   onDestroy()V
-   onDestroyOptionsMenu()V
-   onDestroyView()V
-   onDetach()V
-   onGetLayoutInflater(LBundle;)LLayoutInflater;
-   onHiddenChanged(Z)V
-   onInflate(LContext;LAttributeSet;LBundle;)V
-   onMultiWindowModeChanged(ZLConfiguration;)V
-   onOptionsItemSelected(LMenuItem;)Z
-   onOptionsMenuClosed(LMenu;)V
-   onPause()V
-   onPictureInPictureModeChanged(ZLConfiguration;)V
-   onPrepareOptionsMenu(LMenu;)V
-   onRequestPermissionsResult(I[LString;[I)V
-   onResume()V
-   onSaveInstanceState(LBundle;)V
-   onStart()V
-   onStop()V
-   onViewCreated(LView;LBundle;)V
-   onViewStateRestored(LBundle;)V
-   postponeEnterTransition()V
-   registerForContextMenu(LView;)V
-   requestPermissions([LString;I)V
-   setAllowEnterTransitionOverlap(Z)V
-   setAllowReturnTransitionOverlap(Z)V
-   setArguments(LBundle;)V
-   setEnterSharedElementCallback(LSharedElementCallback;)V
-   setEnterTransition(LTransition;)V
-   setExitSharedElementCallback(LSharedElementCallback;)V
-   setExitTransition(LTransition;)V
-   setHasOptionsMenu(Z)V
-   setInitialSavedState(LSavedState;)V
-   setMenuVisibility(Z)V
-   setReenterTransition(LTransition;)V
-   setRetainInstance(Z)V
-   setReturnTransition(LTransition;)V
-   setSharedElementEnterTransition(LTransition;)V
-   setSharedElementReturnTransition(LTransition;)V
-   setTargetFragment(LFragment;I)V
-   setUserVisibleHint(Z)V
-   shouldShowRequestPermissionRationale(LString;)Z
-   startActivity(LIntent;)V
-   startActivity(LIntent;LBundle;)V
-   startActivityForResult(LIntent;I)V
-   startActivityForResult(LIntent;ILBundle;)V
-   startIntentSenderForResult(LIntentSender;ILIntent;IIILBundle;)V
-   startPostponedEnterTransition()V
-   unregisterForContextMenu(LView;)V
```


```diff
android/app/Fragment$InstantiationException
-   <init>(LString;LException;)V
```


```diff
android/app/Fragment$SavedState
-   CREATOR
```


```diff
android/app/FragmentBreadCrumbs
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   setActivity(LActivity;)V
-   setMaxVisible(I)V
-   setOnBreadCrumbClickListener(LOnBreadCrumbClickListener;)V
-   setParentTitle(LCharSequence;LCharSequence;LOnClickListener;)V
-   setTitle(LCharSequence;LCharSequence;)V
```


```diff
android/app/FragmentBreadCrumbs$OnBreadCrumbClickListener
-   onBreadCrumbClick(LBackStackEntry;I)Z
```


```diff
android/app/FragmentContainer
-   <init>()V
-   onFindViewById(I)LView;
-   onHasView()Z
```


```diff
android/app/FragmentController
-   attachHost(LFragment;)V
-   createController(LFragmentHostCallback;)LFragmentController;
-   dispatchActivityCreated()V
-   dispatchConfigurationChanged(LConfiguration;)V
-   dispatchContextItemSelected(LMenuItem;)Z
-   dispatchCreate()V
-   dispatchCreateOptionsMenu(LMenu;LMenuInflater;)Z
-   dispatchDestroy()V
-   dispatchDestroyView()V
-   dispatchLowMemory()V
-   dispatchMultiWindowModeChanged(ZLConfiguration;)V
-   dispatchOptionsItemSelected(LMenuItem;)Z
-   dispatchOptionsMenuClosed(LMenu;)V
-   dispatchPause()V
-   dispatchPictureInPictureModeChanged(ZLConfiguration;)V
-   dispatchPrepareOptionsMenu(LMenu;)Z
-   dispatchResume()V
-   dispatchStart()V
-   dispatchStop()V
-   dispatchTrimMemory(I)V
-   doLoaderDestroy()V
-   doLoaderStart()V
-   doLoaderStop(Z)V
-   dumpLoaders(LString;LFileDescriptor;LPrintWriter;[LString;)V
-   execPendingActions()Z
-   findFragmentByWho(LString;)LFragment;
-   getFragmentManager()LFragmentManager;
-   getLoaderManager()LLoaderManager;
-   noteStateNotSaved()V
-   onCreateView(LView;LString;LContext;LAttributeSet;)LView;
-   reportLoaderStart()V
-   restoreAllState(LParcelable;LFragmentManagerNonConfig;)V
-   restoreLoaderNonConfig(LArrayMap;)V
-   retainLoaderNonConfig()LArrayMap;
-   retainNestedNonConfig()LFragmentManagerNonConfig;
-   saveAllState()LParcelable;
```


```diff
android/app/FragmentHostCallback
-   <init>(LContext;LHandler;I)V
-   onAttachFragment(LFragment;)V
-   onDump(LString;LFileDescriptor;LPrintWriter;[LString;)V
-   onGetHost()LObject;
-   onGetLayoutInflater()LLayoutInflater;
-   onGetWindowAnimations()I
-   onHasWindowAnimations()Z
-   onInvalidateOptionsMenu()V
-   onRequestPermissionsFromFragment(LFragment;[LString;I)V
-   onShouldSaveFragmentState(LFragment;)Z
-   onStartActivityFromFragment(LFragment;LIntent;ILBundle;)V
-   onStartIntentSenderFromFragment(LFragment;LIntentSender;ILIntent;IIILBundle;)V
-   onUseFragmentManagerInflaterFactory()Z
```


```diff
android/app/FragmentManager
-   POP_BACK_STACK_INCLUSIVE
-   <init>()V
-   addOnBackStackChangedListener(LOnBackStackChangedListener;)V
-   beginTransaction()LFragmentTransaction;
-   dump(LString;LFileDescriptor;LPrintWriter;[LString;)V
-   enableDebugLogging(Z)V
-   executePendingTransactions()Z
-   findFragmentById(I)LFragment;
-   findFragmentByTag(LString;)LFragment;
-   getBackStackEntryAt(I)LBackStackEntry;
-   getBackStackEntryCount()I
-   getFragment(LBundle;LString;)LFragment;
-   getFragments()LList;
-   getPrimaryNavigationFragment()LFragment;
-   invalidateOptionsMenu()V
-   isDestroyed()Z
-   isStateSaved()Z
-   popBackStack()V
-   popBackStack(II)V
-   popBackStack(LString;I)V
-   popBackStackImmediate()Z
-   popBackStackImmediate(II)Z
-   popBackStackImmediate(LString;I)Z
-   putFragment(LBundle;LString;LFragment;)V
-   registerFragmentLifecycleCallbacks(LFragmentLifecycleCallbacks;Z)V
-   removeOnBackStackChangedListener(LOnBackStackChangedListener;)V
-   saveFragmentInstanceState(LFragment;)LSavedState;
-   unregisterFragmentLifecycleCallbacks(LFragmentLifecycleCallbacks;)V
```


```diff
android/app/FragmentManager$BackStackEntry
-   getBreadCrumbShortTitle()LCharSequence;
-   getBreadCrumbShortTitleRes()I
-   getBreadCrumbTitle()LCharSequence;
-   getBreadCrumbTitleRes()I
-   getId()I
-   getName()LString;
```


```diff
android/app/FragmentManager$FragmentLifecycleCallbacks
-   <init>()V
-   onFragmentActivityCreated(LFragmentManager;LFragment;LBundle;)V
-   onFragmentAttached(LFragmentManager;LFragment;LContext;)V
-   onFragmentCreated(LFragmentManager;LFragment;LBundle;)V
-   onFragmentDestroyed(LFragmentManager;LFragment;)V
-   onFragmentDetached(LFragmentManager;LFragment;)V
-   onFragmentPaused(LFragmentManager;LFragment;)V
-   onFragmentPreAttached(LFragmentManager;LFragment;LContext;)V
-   onFragmentPreCreated(LFragmentManager;LFragment;LBundle;)V
-   onFragmentResumed(LFragmentManager;LFragment;)V
-   onFragmentSaveInstanceState(LFragmentManager;LFragment;LBundle;)V
-   onFragmentStarted(LFragmentManager;LFragment;)V
-   onFragmentStopped(LFragmentManager;LFragment;)V
-   onFragmentViewCreated(LFragmentManager;LFragment;LView;LBundle;)V
-   onFragmentViewDestroyed(LFragmentManager;LFragment;)V
```


```diff
android/app/FragmentManager$OnBackStackChangedListener
-   onBackStackChanged()V
```


```diff
android/app/FragmentTransaction
-   TRANSIT_ENTER_MASK
-   TRANSIT_EXIT_MASK
-   TRANSIT_FRAGMENT_CLOSE
-   TRANSIT_FRAGMENT_FADE
-   TRANSIT_FRAGMENT_OPEN
-   TRANSIT_NONE
-   TRANSIT_UNSET
-   <init>()V
-   add(ILFragment;)LFragmentTransaction;
-   add(ILFragment;LString;)LFragmentTransaction;
-   add(LFragment;LString;)LFragmentTransaction;
-   addSharedElement(LView;LString;)LFragmentTransaction;
-   addToBackStack(LString;)LFragmentTransaction;
-   attach(LFragment;)LFragmentTransaction;
-   commit()I
-   commitAllowingStateLoss()I
-   commitNow()V
-   commitNowAllowingStateLoss()V
-   detach(LFragment;)LFragmentTransaction;
-   disallowAddToBackStack()LFragmentTransaction;
-   hide(LFragment;)LFragmentTransaction;
-   isAddToBackStackAllowed()Z
-   isEmpty()Z
-   remove(LFragment;)LFragmentTransaction;
-   replace(ILFragment;)LFragmentTransaction;
-   replace(ILFragment;LString;)LFragmentTransaction;
-   runOnCommit(LRunnable;)LFragmentTransaction;
-   setBreadCrumbShortTitle(I)LFragmentTransaction;
-   setBreadCrumbShortTitle(LCharSequence;)LFragmentTransaction;
-   setBreadCrumbTitle(I)LFragmentTransaction;
-   setBreadCrumbTitle(LCharSequence;)LFragmentTransaction;
-   setCustomAnimations(II)LFragmentTransaction;
-   setCustomAnimations(IIII)LFragmentTransaction;
-   setPrimaryNavigationFragment(LFragment;)LFragmentTransaction;
-   setReorderingAllowed(Z)LFragmentTransaction;
-   setTransition(I)LFragmentTransaction;
-   setTransitionStyle(I)LFragmentTransaction;
-   show(LFragment;)LFragmentTransaction;
```


```diff
android/app/KeyguardManager
-   createConfirmDeviceCredentialIntent(LCharSequence;LCharSequence;)LIntent;
```


```diff
android/app/KeyguardManager$KeyguardLock
-   disableKeyguard()V
-   reenableKeyguard()V
```


```diff
android/app/KeyguardManager$OnKeyguardExitResult
-   onKeyguardExitResult(Z)V
```


```diff
android/app/ListFragment
-   <init>()V
-   getListAdapter()LListAdapter;
-   getListView()LListView;
-   getSelectedItemId()J
-   getSelectedItemPosition()I
-   onListItemClick(LListView;LView;IJ)V
-   setEmptyText(LCharSequence;)V
-   setListAdapter(LListAdapter;)V
-   setListShown(Z)V
-   setListShownNoAnimation(Z)V
-   setSelection(I)V
```


```diff
android/app/LoaderManager
-   <init>()V
-   destroyLoader(I)V
-   dump(LString;LFileDescriptor;LPrintWriter;[LString;)V
-   enableDebugLogging(Z)V
-   getLoader(I)LLoader;
-   initLoader(ILBundle;LLoaderCallbacks;)LLoader;
-   restartLoader(ILBundle;LLoaderCallbacks;)LLoader;
```


```diff
android/app/LoaderManager$LoaderCallbacks
-   onCreateLoader(ILBundle;)LLoader;
-   onLoadFinished(LLoader;LObject;)V
-   onLoaderReset(LLoader;)V
```


```diff
android/app/LocalActivityManager
-   <init>(LActivity;Z)V
-   destroyActivity(LString;Z)LWindow;
-   dispatchCreate(LBundle;)V
-   dispatchDestroy(Z)V
-   dispatchPause(Z)V
-   dispatchResume()V
-   dispatchStop()V
-   getActivity(LString;)LActivity;
-   getCurrentActivity()LActivity;
-   getCurrentId()LString;
-   removeAllActivities()V
-   saveInstanceState()LBundle;
-   startActivity(LString;LIntent;)LWindow;
```


```diff
android/app/Notification
+   FLAG_BUBBLE
+   getAllowSystemGeneratedContextualActions()Z
+   getBubbleMetadata()LBubbleMetadata;
+   getLocusId()LLocusId;
```


```diff
android/app/Notification$Action
+   isContextual()Z
```


```diff
android/app/Notification$Action$Builder
+   setContextual(Z)Landroid/app/Notification$Action$Builder;
```


```diff
+android/app/Notification$BubbleMetadata
```


```diff
+android/app/Notification$BubbleMetadata$Builder
```


```diff
android/app/Notification$Builder
+   setAllowSystemGeneratedContextualActions(Z)LBuilder;
+   setBubbleMetadata(LBubbleMetadata;)LBuilder;
+   setLocusId(LLocusId;)LBuilder;
```


```diff
android/app/Notification$WearableExtender
-   SCREEN_TIMEOUT_LONG
-   SCREEN_TIMEOUT_SHORT
-   SIZE_DEFAULT
-   SIZE_FULL_SCREEN
-   SIZE_LARGE
-   SIZE_MEDIUM
-   SIZE_SMALL
-   SIZE_XSMALL
-   addPage(LNotification;)LWearableExtender;
-   addPages(LList;)LWearableExtender;
-   clearPages()LWearableExtender;
-   getBackground()LBitmap;
-   getDisplayIntent()LPendingIntent;
-   getHintAmbientBigPicture()Z
-   getPages()LList;
-   setBackground(LBitmap;)LWearableExtender;
-   setDisplayIntent(LPendingIntent;)LWearableExtender;
-   setHintAmbientBigPicture(Z)LWearableExtender;
```


```diff
android/app/NotificationChannel
+   canBubble()Z
+   hasUserSetImportance()Z
+   setAllowBubbles(Z)V
```


```diff
android/app/NotificationManager
+   ACTION_AUTOMATIC_ZEN_RULE
+   EXTRA_AUTOMATIC_RULE_ID
+   META_DATA_AUTOMATIC_RULE_TYPE
+   META_DATA_RULE_INSTANCE_LIMIT
+   areBubblesAllowed()Z
+   areNotificationsPaused()Z
+   canNotifyAsPackage(LString;)Z
+   getNotificationDelegate()LString;
+   notifyAsPackage(LString;LString;ILNotification;)V
+   setAutomaticZenRuleState(LString;LCondition;)V
+   setNotificationDelegate(LString;)V
+   shouldHideSilentStatusBarIcons()Z
```


```diff
android/app/ProgressDialog
-   STYLE_HORIZONTAL
-   STYLE_SPINNER
-   <init>(LContext;)V
-   <init>(LContext;I)V
-   getMax()I
-   getProgress()I
-   getSecondaryProgress()I
-   incrementProgressBy(I)V
-   incrementSecondaryProgressBy(I)V
-   isIndeterminate()Z
-   setIndeterminate(Z)V
-   setIndeterminateDrawable(LDrawable;)V
-   setMax(I)V
-   setProgress(I)V
-   setProgressDrawable(LDrawable;)V
-   setProgressNumberFormat(LString;)V
-   setProgressPercentFormat(LNumberFormat;)V
-   setProgressStyle(I)V
-   setSecondaryProgress(I)V
-   show(LContext;LCharSequence;LCharSequence;)LProgressDialog;
-   show(LContext;LCharSequence;LCharSequence;Z)LProgressDialog;
-   show(LContext;LCharSequence;LCharSequence;ZZ)LProgressDialog;
-   show(LContext;LCharSequence;LCharSequence;ZZLOnCancelListener;)LProgressDialog;
```


```diff
+android/app/RecoverableSecurityException
```


```diff
android/app/RemoteInput
+   EDIT_CHOICES_BEFORE_SENDING_AUTO
+   EDIT_CHOICES_BEFORE_SENDING_DISABLED
+   EDIT_CHOICES_BEFORE_SENDING_ENABLED
+   getEditChoicesBeforeSending()I
```


```diff
android/app/RemoteInput$Builder
+   setEditChoicesBeforeSending(I)LBuilder;
```


```diff
android/app/Service
+   getForegroundServiceType()I
+   startForeground(ILNotification;I)V
```


```diff
+android/app/StatusBarManager
```


```diff
android/app/TabActivity
-   <init>()V
-   getTabHost()LTabHost;
-   getTabWidget()LTabWidget;
-   setDefaultTab(I)V
-   setDefaultTab(LString;)V
```


```diff
+android/app/TaskInfo
```


```diff
android/app/UiAutomation
+   adoptShellPermissionIdentity()V
+   adoptShellPermissionIdentity([LString;)V
+   dropShellPermissionIdentity()V
```


```diff
android/app/VoiceInteractor
+   isDestroyed()Z
+   notifyDirectActionsChanged()V
+   registerOnDestroyedCallback(LExecutor;LRunnable;)Z
+   unregisterOnDestroyedCallback(LRunnable;)Z
```


```diff
android/app/WallpaperInfo
+   getSettingsSliceUri()LUri;
+   supportsMultipleDisplays()Z
```


```diff
+android/app/ZygotePreload
```


```diff
+android/app/admin/DelegatedAdminReceiver
```


```diff
android/app/admin/DeviceAdminReceiver
+   ACTION_CHOOSE_PRIVATE_KEY_ALIAS
+   ACTION_NETWORK_LOGS_AVAILABLE
```


```diff
android/app/admin/DevicePolicyManager
+   ACTION_ADMIN_POLICY_COMPLIANCE
+   ACTION_GET_PROVISIONING_MODE
+   DELEGATION_CERT_SELECTION
+   DELEGATION_NETWORK_LOGGING
+   EXTRA_PASSWORD_COMPLEXITY
+   EXTRA_PROVISIONING_IMEI
+   EXTRA_PROVISIONING_MODE
+   EXTRA_PROVISIONING_SERIAL_NUMBER
+   EXTRA_PROVISIONING_SKIP_EDUCATION_SCREENS
+   EXTRA_PROVISIONING_WIFI_ANONYMOUS_IDENTITY
+   EXTRA_PROVISIONING_WIFI_CA_CERTIFICATE
+   EXTRA_PROVISIONING_WIFI_DOMAIN
+   EXTRA_PROVISIONING_WIFI_EAP_METHOD
+   EXTRA_PROVISIONING_WIFI_IDENTITY
+   EXTRA_PROVISIONING_WIFI_PHASE2_AUTH
+   EXTRA_PROVISIONING_WIFI_USER_CERTIFICATE
+   PASSWORD_COMPLEXITY_HIGH
+   PASSWORD_COMPLEXITY_LOW
+   PASSWORD_COMPLEXITY_MEDIUM
+   PASSWORD_COMPLEXITY_NONE
+   PRIVATE_DNS_MODE_OFF
+   PRIVATE_DNS_MODE_OPPORTUNISTIC
+   PRIVATE_DNS_MODE_PROVIDER_HOSTNAME
+   PRIVATE_DNS_MODE_UNKNOWN
+   PRIVATE_DNS_SET_ERROR_FAILURE_SETTING
+   PRIVATE_DNS_SET_ERROR_HOST_NOT_SERVING
+   PRIVATE_DNS_SET_NO_ERROR
+   PROVISIONING_MODE_FULLY_MANAGED_DEVICE
+   PROVISIONING_MODE_MANAGED_PROFILE
+   WIPE_SILENTLY
+   getAlwaysOnVpnLockdownWhitelist(LComponentName;)LSet;
+   getCrossProfileCalendarPackages(LComponentName;)LSet;
+   getGlobalPrivateDnsHost(LComponentName;)LString;
+   getGlobalPrivateDnsMode(LComponentName;)I
+   getPasswordComplexity()I
+   installSystemUpdate(LComponentName;LUri;LExecutor;LInstallSystemUpdateCallback;)V
+   isAlwaysOnVpnLockdownEnabled(LComponentName;)Z
+   setAlwaysOnVpnPackage(LComponentName;LString;ZLSet;)V
+   setCrossProfileCalendarPackages(LComponentName;LSet;)V
+   setDefaultSmsApplication(LComponentName;LString;)V
+   setGlobalPrivateDnsModeOpportunistic(LComponentName;)I
+   setGlobalPrivateDnsModeSpecifiedHost(LComponentName;LString;)I
```


```diff
+android/app/admin/DevicePolicyManager$InstallSystemUpdateCallback
```


```diff
android/app/backup/BackupManager
+   getUserForAncestralSerialNumber(J)LUserHandle;
```


```diff
+android/app/role/RoleManager
```


```diff
android/app/usage/UsageEvents$Event
+   ACTIVITY_PAUSED
+   ACTIVITY_RESUMED
+   ACTIVITY_STOPPED
+   DEVICE_SHUTDOWN
+   DEVICE_STARTUP
+   FOREGROUND_SERVICE_START
+   FOREGROUND_SERVICE_STOP
-   MOVE_TO_BACKGROUND
-   MOVE_TO_FOREGROUND
```


```diff
android/app/usage/UsageStats
+   getLastTimeForegroundServiceUsed()J
+   getLastTimeVisible()J
+   getTotalTimeForegroundServiceUsed()J
+   getTotalTimeVisible()J
```


```diff
android/appwidget/AppWidgetHostView
+   setOnLightBackground(Z)V
```


```diff
android/bluetooth/BluetoothAdapter
+   listenUsingInsecureL2capChannel()LBluetoothServerSocket;
+   listenUsingL2capChannel()LBluetoothServerSocket;
```


```diff
android/bluetooth/BluetoothDevice
+   createInsecureL2capChannel(I)LBluetoothSocket;
+   createL2capChannel(I)LBluetoothSocket;
```


```diff
-android/bluetooth/BluetoothHealth
-   APP_CONFIG_REGISTRATION_FAILURE
-   APP_CONFIG_REGISTRATION_SUCCESS
-   APP_CONFIG_UNREGISTRATION_FAILURE
-   APP_CONFIG_UNREGISTRATION_SUCCESS
-   CHANNEL_TYPE_RELIABLE
-   CHANNEL_TYPE_STREAMING
-   SINK_ROLE
-   SOURCE_ROLE
-   STATE_CHANNEL_CONNECTED
-   STATE_CHANNEL_CONNECTING
-   STATE_CHANNEL_DISCONNECTED
-   STATE_CHANNEL_DISCONNECTING
-   connectChannelToSource(LBluetoothDevice;LBluetoothHealthAppConfiguration;)Z
-   disconnectChannel(LBluetoothDevice;LBluetoothHealthAppConfiguration;I)Z
-   getMainChannelFd(LBluetoothDevice;LBluetoothHealthAppConfiguration;)LParcelFileDescriptor;
-   registerSinkAppConfiguration(LString;ILBluetoothHealthCallback;)Z
-   unregisterAppConfiguration(LBluetoothHealthAppConfiguration;)Z
```


```diff
-android/bluetooth/BluetoothHealthAppConfiguration
-   CREATOR
-   getDataType()I
-   getName()LString;
-   getRole()I
```


```diff
-android/bluetooth/BluetoothHealthCallback
-   <init>()V
-   onHealthAppConfigurationStatusChange(LBluetoothHealthAppConfiguration;I)V
-   onHealthChannelStateChange(LBluetoothHealthAppConfiguration;LBluetoothDevice;IILParcelFileDescriptor;I)V
```


```diff
+android/bluetooth/BluetoothHearingAid
```


```diff
android/bluetooth/BluetoothProfile
-   HEALTH
+   HEARING_AID
```


```diff
android/bluetooth/BluetoothServerSocket
+   getPsm()I
```


```diff
android/bluetooth/le/ScanFilter
+   getServiceSolicitationUuid()LParcelUuid;
+   getServiceSolicitationUuidMask()LParcelUuid;
```


```diff
android/bluetooth/le/ScanFilter$Builder
+   setServiceSolicitationUuid(LParcelUuid;)LBuilder;
+   setServiceSolicitationUuid(LParcelUuid;LParcelUuid;)LBuilder;
```


```diff
android/bluetooth/le/ScanRecord
+   getServiceSolicitationUuids()LList;
```


```diff
android/content/AsyncTaskLoader
-   <init>(LContext;)V
-   cancelLoadInBackground()V
-   isLoadInBackgroundCanceled()Z
-   loadInBackground()LObject;
-   onCanceled(LObject;)V
-   onLoadInBackground()LObject;
-   setUpdateThrottle(J)V
```


```diff
android/content/ContentProvider
+   applyBatch(LString;LArrayList;)[LContentProviderResult;
+   call(LString;LString;LString;LBundle;)LBundle;
+   clearCallingIdentity()LCallingIdentity;
+   restoreCallingIdentity(LCallingIdentity;)V
```


```diff
+android/content/ContentProvider$CallingIdentity
```


```diff
android/content/ContentProviderClient
+   applyBatch(LString;LArrayList;)[LContentProviderResult;
+   call(LString;LString;LString;LBundle;)LBundle;
+   openTypedAssetFile(LUri;LString;LBundle;LCancellationSignal;)LAssetFileDescriptor;
```


```diff
android/content/ContentResolver
+   call(LString;LString;LString;LBundle;)LBundle;
+   getTypeInfo(LString;)LMimeTypeInfo;
+   loadThumbnail(LUri;LSize;LCancellationSignal;)LBitmap;
+   openAssetFile(LUri;LString;LCancellationSignal;)LAssetFileDescriptor;
+   openFile(LUri;LString;LCancellationSignal;)LParcelFileDescriptor;
+   openTypedAssetFile(LUri;LString;LBundle;LCancellationSignal;)LAssetFileDescriptor;
+   wrap(LContentProvider;)LContentResolver;
+   wrap(LContentProviderClient;)LContentResolver;
```


```diff
+android/content/ContentResolver$MimeTypeInfo
```


```diff
android/content/ContentUris
+   removeId(LUri;)LUri;
```


```diff
android/content/Context
+   BIND_INCLUDE_CAPABILITIES
+   BIND_NOT_PERCEPTIBLE
+   BIOMETRIC_SERVICE
+   ROLE_SERVICE
+   bindIsolatedService(LIntent;ILString;LExecutor;LServiceConnection;)Z
+   bindService(LIntent;ILExecutor;LServiceConnection;)Z
+   getOpPackageName()LString;
+   updateServiceGroup(LServiceConnection;II)V
```


```diff
android/content/CursorLoader
-   <init>(LContext;)V
-   <init>(LContext;LUri;[LString;LString;[LString;LString;)V
-   deliverResult(LCursor;)V
-   getProjection()[LString;
-   getSelection()LString;
-   getSelectionArgs()[LString;
-   getSortOrder()LString;
-   getUri()LUri;
-   loadInBackground()LCursor;
-   onCanceled(LCursor;)V
-   setProjection([LString;)V
-   setSelection(LString;)V
-   setSelectionArgs([LString;)V
-   setSortOrder(LString;)V
-   setUri(LUri;)V
```


```diff
android/content/Intent
+   ACTION_DEFINE
-   ACTION_INSTALL_PACKAGE
-   ACTION_MEDIA_SCANNER_SCAN_FILE
-   ACTION_NEW_OUTGOING_CALL
+   ACTION_TRANSLATE
-   ACTION_UNINSTALL_PACKAGE
+   ACTION_VIEW_LOCUS
+   ACTION_VIEW_PERMISSION_USAGE
+   CATEGORY_APP_FILES
+   CATEGORY_SECONDARY_HOME
+   EXTRA_AUTO_LAUNCH_SINGLE_CHOICE
+   EXTRA_CONTENT_QUERY
+   EXTRA_DURATION_MILLIS
+   EXTRA_LOCUS_ID
+   EXTRA_SHORTCUT_ID
+   FILL_IN_IDENTIFIER
+   FLAG_DIRECT_BOOT_AUTO
+   getIdentifier()LString;
+   setIdentifier(LString;)LIntent;
```


```diff
android/content/Loader
-   <init>(LContext;)V
-   abandon()V
-   cancelLoad()Z
-   commitContentChanged()V
-   dataToString(LObject;)LString;
-   deliverCancellation()V
-   deliverResult(LObject;)V
-   dump(LString;LFileDescriptor;LPrintWriter;[LString;)V
-   forceLoad()V
-   getContext()LContext;
-   getId()I
-   isAbandoned()Z
-   isReset()Z
-   isStarted()Z
-   onAbandon()V
-   onCancelLoad()Z
-   onContentChanged()V
-   onForceLoad()V
-   onReset()V
-   onStartLoading()V
-   onStopLoading()V
-   registerListener(ILOnLoadCompleteListener;)V
-   registerOnLoadCanceledListener(LOnLoadCanceledListener;)V
-   reset()V
-   rollbackContentChanged()V
-   startLoading()V
-   stopLoading()V
-   takeContentChanged()Z
-   unregisterListener(LOnLoadCompleteListener;)V
-   unregisterOnLoadCanceledListener(LOnLoadCanceledListener;)V
```


```diff
android/content/Loader$ForceLoadContentObserver
-   <init>(LLoader;)V
```


```diff
android/content/Loader$OnLoadCanceledListener
-   onLoadCanceled(LLoader;)V
```


```diff
android/content/Loader$OnLoadCompleteListener
-   onLoadComplete(LLoader;LObject;)V
```


```diff
+android/content/LocusId
```


```diff
android/content/pm/ApplicationInfo
+   isProfileableByShell()Z
+   isResourceOverlay()Z
```


```diff
android/content/pm/LauncherApps
+   getAllPackageInstallerSessions()LList;
+   registerPackageInstallerSessionCallback(LExecutor;LSessionCallback;)V
+   shouldHideFromSuggestions(LString;LUserHandle;)Z
+   startPackageInstallerSessionDetailsActivity(LSessionInfo;LRect;LBundle;)V
+   unregisterPackageInstallerSessionCallback(LSessionCallback;)V
```


```diff
+android/content/pm/ModuleInfo
```


```diff
android/content/pm/PackageInfo
+   isApex
```


```diff
android/content/pm/PackageInstaller
+   ACTION_SESSION_UPDATED
+   getActiveStagedSession()LSessionInfo;
+   getStagedSessions()LList;
+   installExistingPackage(LString;ILIntentSender;)V
```


```diff
android/content/pm/PackageInstaller$Session
+   addChildSessionId(I)V
+   getChildSessionIds()[I
+   getParentSessionId()I
+   isMultiPackage()Z
+   isStaged()Z
+   removeChildSessionId(I)V
```


```diff
android/content/pm/PackageInstaller$SessionInfo
+   INVALID_ID
+   STAGED_SESSION_ACTIVATION_FAILED
+   STAGED_SESSION_NO_ERROR
+   STAGED_SESSION_UNKNOWN
+   STAGED_SESSION_VERIFICATION_FAILED
+   getChildSessionIds()[I
+   getParentSessionId()I
+   getStagedSessionErrorCode()I
+   getStagedSessionErrorMessage()LString;
+   getUpdatedMillis()J
+   getUser()LUserHandle;
+   isCommitted()Z
+   isMultiPackage()Z
+   isStaged()Z
+   isStagedSessionApplied()Z
+   isStagedSessionFailed()Z
+   isStagedSessionReady()Z
```


```diff
android/content/pm/PackageInstaller$SessionParams
+   RESTRICTED_PERMISSIONS_ALL
+   setMultiPackage()V
+   setWhitelistedRestrictedPermissions(LSet;)V
```


```diff
android/content/pm/PackageManager
+   FEATURE_FACE
+   FEATURE_IPSEC_TUNNELS
+   FEATURE_IRIS
+   FEATURE_NFC_BEAM
+   FEATURE_NFC_OFF_HOST_CARD_EMULATION_ESE
+   FEATURE_NFC_OFF_HOST_CARD_EMULATION_UICC
+   FEATURE_SECURE_LOCK_SCREEN
+   FEATURE_TELEPHONY_IMS
+   FLAG_PERMISSION_WHITELIST_INSTALLER
+   FLAG_PERMISSION_WHITELIST_SYSTEM
+   FLAG_PERMISSION_WHITELIST_UPGRADE
+   MATCH_APEX
+   MATCH_DIRECT_BOOT_AUTO
+   addWhitelistedRestrictedPermission(LString;LString;I)Z
-   clearPackagePreferredActivities(LString;)V
+   getInstalledModules(I)LList;
+   getModuleInfo(LString;I)LModuleInfo;
-   getPreferredActivities(LList;LList;LString;)I
-   getPreferredPackages(I)LList;
+   getSyntheticAppDetailsActivityEnabled(LString;)Z
+   getWhitelistedRestrictedPermissions(LString;I)LSet;
+   isDeviceUpgrading()Z
+   isPackageSuspended(LString;)Z
+   removeWhitelistedRestrictedPermission(LString;LString;I)Z
```


```diff
android/content/pm/PackageStats
-   CREATOR
-   cacheSize
-   codeSize
-   dataSize
-   externalCacheSize
-   externalCodeSize
-   externalDataSize
-   externalMediaSize
-   externalObbSize
-   packageName
-   <init>(LPackageStats;)V
-   <init>(LParcel;)V
-   <init>(LString;)V
```


```diff
android/content/pm/PermissionGroupInfo
-   <init>()V
-   <init>(LPermissionGroupInfo;)V
```


```diff
android/content/pm/PermissionInfo
+   FLAG_HARD_RESTRICTED
+   FLAG_IMMUTABLY_RESTRICTED
+   FLAG_SOFT_RESTRICTED
-   <init>()V
-   <init>(LPermissionInfo;)V
```


```diff
android/content/pm/ProviderInfo
+   forceUriPermissions
```


```diff
android/content/pm/ServiceInfo
+   FLAG_USE_APP_ZYGOTE
+   FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE
+   FOREGROUND_SERVICE_TYPE_DATA_SYNC
+   FOREGROUND_SERVICE_TYPE_LOCATION
+   FOREGROUND_SERVICE_TYPE_MANIFEST
+   FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
+   FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION
+   FOREGROUND_SERVICE_TYPE_NONE
+   FOREGROUND_SERVICE_TYPE_PHONE_CALL
+   getForegroundServiceType()I
```


```diff
android/content/pm/ShortcutInfo
+   getLocusId()LLocusId;
```


```diff
android/content/pm/ShortcutInfo$Builder
+   setLocusId(LLocusId;)LBuilder;
+   setLongLived(Z)LBuilder;
+   setPerson(LPerson;)LBuilder;
+   setPersons([LPerson;)LBuilder;
```


```diff
android/content/res/Resources
+   ID_NULL
+   getAttributeSetSourceResId(LAttributeSet;)I
+   getFloat(I)F
-   getMovie(I)LMovie;
```


```diff
android/content/res/Resources$Theme
+   getAttributeResolutionStack(III)[I
+   getExplicitStyle(LAttributeSet;)I
+   rebase()V
```


```diff
android/content/res/TypedArray
+   getSourceResourceId(II)I
```


```diff
android/database/Cursor
+   getNotificationUris()LList;
+   setNotificationUris(LContentResolver;LList;)V
```


```diff
android/database/DatabaseUtils$InsertHelper
-   <init>(LSQLiteDatabase;LString;)V
-   bind(ID)V
-   bind(IF)V
-   bind(II)V
-   bind(IJ)V
-   bind(ILString;)V
-   bind(IZ)V
-   bind(I[B)V
-   bindNull(I)V
-   close()V
-   execute()J
-   getColumnIndex(LString;)I
-   insert(LContentValues;)J
-   prepareForInsert()V
-   prepareForReplace()V
-   replace(LContentValues;)J
```


```diff
android/database/sqlite/SQLiteDatabase$OpenParams$Builder
-   setIdleConnectionTimeout(J)Landroid/database/sqlite/SQLiteDatabase$OpenParams$Builder;
```


```diff
android/database/sqlite/SQLiteOpenHelper
-   setIdleConnectionTimeout(J)V
```


```diff
android/database/sqlite/SQLiteQueryBuilder
+   appendWhereStandalone(LCharSequence;)V
+   delete(LSQLiteDatabase;LString;[LString;)I
+   getCursorFactory()LCursorFactory;
+   getProjectionMap()LMap;
+   isDistinct()Z
+   isStrict()Z
+   update(LSQLiteDatabase;LContentValues;LString;[LString;)I
```


```diff
android/graphics/Bitmap
+   eraseColor(J)V
+   getColor(II)LColor;
+   setColorSpace(LColorSpace;)V
+   wrapHardwareBuffer(LHardwareBuffer;LColorSpace;)LBitmap;
```


```diff
android/graphics/Bitmap$Config
-   ARGB_4444
```


```diff
+android/graphics/BlendMode
```


```diff
+android/graphics/BlendModeColorFilter
```


```diff
android/graphics/Canvas
+   disableZ()V
+   drawColor(ILBlendMode;)V
+   drawColor(J)V
+   drawColor(JLBlendMode;)V
+   drawDoubleRoundRect(LRectF;FFLRectF;FFLPaint;)V
+   drawDoubleRoundRect(LRectF;[FLRectF;[FLPaint;)V
+   drawRenderNode(LRenderNode;)V
+   drawTextRun(LMeasuredText;IIIIFFZLPaint;)V
+   enableZ()V
```


```diff
android/graphics/ComposeShader
+   <init>(LShader;LShader;LBlendMode;)V
-   <init>(LShader;LShader;LXfermode;)V
```


```diff
+android/graphics/HardwareRenderer
```


```diff
+android/graphics/HardwareRenderer$FrameRenderRequest
```


```diff
android/graphics/ImageDecoder
+   createSource(LCallable;)LSource;
+   isMimeTypeSupported(LString;)Z
```


```diff
android/graphics/ImageFormat
+   DEPTH_JPEG
+   HEIC
+   Y8
```


```diff
+android/graphics/Insets
```


```diff
android/graphics/LinearGradient
+   <init>(FFFFJJLTileMode;)V
+   <init>(FFFF[J[FLTileMode;)V
```


```diff
android/graphics/Movie
-   decodeByteArray([BII)LMovie;
-   decodeFile(LString;)LMovie;
-   decodeStream(LInputStream;)LMovie;
-   draw(LCanvas;FF)V
-   draw(LCanvas;FFLPaint;)V
-   duration()I
-   height()I
-   isOpaque()Z
-   setTime(I)Z
-   width()I
```


```diff
android/graphics/Paint
+   CURSOR_AFTER
+   CURSOR_AT
+   CURSOR_AT_OR_AFTER
+   CURSOR_AT_OR_BEFORE
+   CURSOR_BEFORE
+   END_HYPHEN_EDIT_INSERT_ARMENIAN_HYPHEN
+   END_HYPHEN_EDIT_INSERT_HYPHEN
+   END_HYPHEN_EDIT_INSERT_MAQAF
+   END_HYPHEN_EDIT_INSERT_UCAS_HYPHEN
+   END_HYPHEN_EDIT_INSERT_ZWJ_AND_HYPHEN
+   END_HYPHEN_EDIT_NO_EDIT
+   END_HYPHEN_EDIT_REPLACE_WITH_HYPHEN
+   START_HYPHEN_EDIT_INSERT_HYPHEN
+   START_HYPHEN_EDIT_INSERT_ZWJ
+   START_HYPHEN_EDIT_NO_EDIT
+   getBlendMode()LBlendMode;
+   getColorLong()J
+   getEndHyphenEdit()I
+   getShadowLayerColor()I
+   getShadowLayerColorLong()J
+   getShadowLayerDx()F
+   getShadowLayerDy()F
+   getShadowLayerRadius()F
+   getStartHyphenEdit()I
+   getStrikeThruPosition()F
+   getStrikeThruThickness()F
+   getTextBounds(LCharSequence;IILRect;)V
+   getTextRunAdvances([CIIIIZ[FI)F
+   getTextRunCursor(LCharSequence;IIZII)I
+   getTextRunCursor([CIIZII)I
+   getUnderlinePosition()F
+   getUnderlineThickness()F
+   getWordSpacing()F
+   setBlendMode(LBlendMode;)V
+   setColor(J)V
+   setEndHyphenEdit(I)V
+   setShadowLayer(FFFJ)V
+   setStartHyphenEdit(I)V
+   setWordSpacing(F)V
```


```diff
android/graphics/RadialGradient
+   <init>(FFFJJLTileMode;)V
+   <init>(FFF[J[FLTileMode;)V
```


```diff
+android/graphics/RecordingCanvas
```


```diff
+android/graphics/RenderNode
```


```diff
android/graphics/SurfaceTexture$OutOfResourcesException
-   <init>()V
-   <init>(LString;)V
```


```diff
android/graphics/SweepGradient
+   <init>(FFJJ)V
+   <init>(FF[J[F)V
```


```diff
+android/graphics/Typeface$CustomFallbackBuilder
```


```diff
+android/graphics/drawable/ColorStateListDrawable
```


```diff
android/graphics/drawable/Drawable
-   getOpacity()I
+   getOpticalInsets()LInsets;
+   isProjected()Z
-   setColorFilter(ILMode;)V
+   setTintBlendMode(LBlendMode;)V
```


```diff
android/graphics/drawable/GradientDrawable
+   getInnerRadius()I
+   getInnerRadiusRatio()F
+   getThickness()I
+   getThicknessRatio()F
+   setColors([I[F)V
+   setInnerRadius(I)V
+   setInnerRadiusRatio(F)V
+   setPadding(IIII)V
+   setThickness(I)V
+   setThicknessRatio(F)V
```


```diff
android/graphics/drawable/Icon
+   setTintBlendMode(LBlendMode;)LIcon;
```


```diff
android/graphics/drawable/StateListDrawable
+   findStateDrawableIndex([I)I
+   getStateCount()I
+   getStateDrawable(I)LDrawable;
+   getStateSet(I)[I
```


```diff
+android/graphics/fonts/Font
```


```diff
+android/graphics/fonts/Font$Builder
```


```diff
+android/graphics/fonts/FontFamily
```


```diff
+android/graphics/fonts/FontFamily$Builder
```


```diff
+android/graphics/fonts/FontStyle
```


```diff
+android/graphics/fonts/SystemFonts
```


```diff
+android/graphics/text/LineBreaker
```


```diff
+android/graphics/text/LineBreaker$Builder
```


```diff
+android/graphics/text/LineBreaker$ParagraphConstraints
```


```diff
+android/graphics/text/LineBreaker$Result
```


```diff
+android/graphics/text/MeasuredText
```


```diff
+android/graphics/text/MeasuredText$Builder
```


```diff
android/hardware/Camera
-   CAMERA_ERROR_EVICTED
-   CAMERA_ERROR_SERVER_DIED
-   CAMERA_ERROR_UNKNOWN
-   addCallbackBuffer([B)V
-   autoFocus(LAutoFocusCallback;)V
-   cancelAutoFocus()V
-   enableShutterSound(Z)Z
-   getCameraInfo(ILCameraInfo;)V
-   getNumberOfCameras()I
-   getParameters()LParameters;
-   lock()V
-   open()LCamera;
-   open(I)LCamera;
-   reconnect()V
-   release()V
-   setAutoFocusMoveCallback(LAutoFocusMoveCallback;)V
-   setDisplayOrientation(I)V
-   setErrorCallback(LErrorCallback;)V
-   setFaceDetectionListener(LFaceDetectionListener;)V
-   setOneShotPreviewCallback(LPreviewCallback;)V
-   setParameters(LParameters;)V
-   setPreviewCallback(LPreviewCallback;)V
-   setPreviewCallbackWithBuffer(LPreviewCallback;)V
-   setPreviewDisplay(LSurfaceHolder;)V
-   setPreviewTexture(LSurfaceTexture;)V
-   setZoomChangeListener(LOnZoomChangeListener;)V
-   startFaceDetection()V
-   startPreview()V
-   startSmoothZoom(I)V
-   stopFaceDetection()V
-   stopPreview()V
-   stopSmoothZoom()V
-   takePicture(LShutterCallback;LPictureCallback;LPictureCallback;)V
-   takePicture(LShutterCallback;LPictureCallback;LPictureCallback;LPictureCallback;)V
-   unlock()V
```


```diff
android/hardware/Camera$Area
-   rect
-   weight
-   <init>(LRect;I)V
```


```diff
android/hardware/Camera$AutoFocusCallback
-   onAutoFocus(ZLCamera;)V
```


```diff
android/hardware/Camera$AutoFocusMoveCallback
-   onAutoFocusMoving(ZLCamera;)V
```


```diff
android/hardware/Camera$CameraInfo
-   CAMERA_FACING_BACK
-   CAMERA_FACING_FRONT
-   canDisableShutterSound
-   facing
-   orientation
-   <init>()V
```


```diff
android/hardware/Camera$ErrorCallback
-   onError(ILCamera;)V
```


```diff
android/hardware/Camera$Face
-   id
-   leftEye
-   mouth
-   rect
-   rightEye
-   score
-   <init>()V
```


```diff
android/hardware/Camera$FaceDetectionListener
-   onFaceDetection([LFace;LCamera;)V
```


```diff
android/hardware/Camera$OnZoomChangeListener
-   onZoomChange(IZLCamera;)V
```


```diff
android/hardware/Camera$Parameters
-   ANTIBANDING_50HZ
-   ANTIBANDING_60HZ
-   ANTIBANDING_AUTO
-   ANTIBANDING_OFF
-   EFFECT_AQUA
-   EFFECT_BLACKBOARD
-   EFFECT_MONO
-   EFFECT_NEGATIVE
-   EFFECT_NONE
-   EFFECT_POSTERIZE
-   EFFECT_SEPIA
-   EFFECT_SOLARIZE
-   EFFECT_WHITEBOARD
-   FLASH_MODE_AUTO
-   FLASH_MODE_OFF
-   FLASH_MODE_ON
-   FLASH_MODE_RED_EYE
-   FLASH_MODE_TORCH
-   FOCUS_DISTANCE_FAR_INDEX
-   FOCUS_DISTANCE_NEAR_INDEX
-   FOCUS_DISTANCE_OPTIMAL_INDEX
-   FOCUS_MODE_AUTO
-   FOCUS_MODE_CONTINUOUS_PICTURE
-   FOCUS_MODE_CONTINUOUS_VIDEO
-   FOCUS_MODE_EDOF
-   FOCUS_MODE_FIXED
-   FOCUS_MODE_INFINITY
-   FOCUS_MODE_MACRO
-   PREVIEW_FPS_MAX_INDEX
-   PREVIEW_FPS_MIN_INDEX
-   SCENE_MODE_ACTION
-   SCENE_MODE_AUTO
-   SCENE_MODE_BARCODE
-   SCENE_MODE_BEACH
-   SCENE_MODE_CANDLELIGHT
-   SCENE_MODE_FIREWORKS
-   SCENE_MODE_HDR
-   SCENE_MODE_LANDSCAPE
-   SCENE_MODE_NIGHT
-   SCENE_MODE_NIGHT_PORTRAIT
-   SCENE_MODE_PARTY
-   SCENE_MODE_PORTRAIT
-   SCENE_MODE_SNOW
-   SCENE_MODE_SPORTS
-   SCENE_MODE_STEADYPHOTO
-   SCENE_MODE_SUNSET
-   SCENE_MODE_THEATRE
-   WHITE_BALANCE_AUTO
-   WHITE_BALANCE_CLOUDY_DAYLIGHT
-   WHITE_BALANCE_DAYLIGHT
-   WHITE_BALANCE_FLUORESCENT
-   WHITE_BALANCE_INCANDESCENT
-   WHITE_BALANCE_SHADE
-   WHITE_BALANCE_TWILIGHT
-   WHITE_BALANCE_WARM_FLUORESCENT
-   flatten()LString;
-   get(LString;)LString;
-   getAntibanding()LString;
-   getAutoExposureLock()Z
-   getAutoWhiteBalanceLock()Z
-   getColorEffect()LString;
-   getExposureCompensation()I
-   getExposureCompensationStep()F
-   getFlashMode()LString;
-   getFocalLength()F
-   getFocusAreas()LList;
-   getFocusDistances([F)V
-   getFocusMode()LString;
-   getHorizontalViewAngle()F
-   getInt(LString;)I
-   getJpegQuality()I
-   getJpegThumbnailQuality()I
-   getJpegThumbnailSize()LSize;
-   getMaxExposureCompensation()I
-   getMaxNumDetectedFaces()I
-   getMaxNumFocusAreas()I
-   getMaxNumMeteringAreas()I
-   getMaxZoom()I
-   getMeteringAreas()LList;
-   getMinExposureCompensation()I
-   getPictureFormat()I
-   getPictureSize()LSize;
-   getPreferredPreviewSizeForVideo()LSize;
-   getPreviewFormat()I
-   getPreviewFpsRange([I)V
-   getPreviewSize()LSize;
-   getSceneMode()LString;
-   getSupportedAntibanding()LList;
-   getSupportedColorEffects()LList;
-   getSupportedFlashModes()LList;
-   getSupportedFocusModes()LList;
-   getSupportedJpegThumbnailSizes()LList;
-   getSupportedPictureFormats()LList;
-   getSupportedPictureSizes()LList;
-   getSupportedPreviewFormats()LList;
-   getSupportedPreviewFpsRange()LList;
-   getSupportedPreviewSizes()LList;
-   getSupportedSceneModes()LList;
-   getSupportedVideoSizes()LList;
-   getSupportedWhiteBalance()LList;
-   getVerticalViewAngle()F
-   getVideoStabilization()Z
-   getWhiteBalance()LString;
-   getZoom()I
-   getZoomRatios()LList;
-   isAutoExposureLockSupported()Z
-   isAutoWhiteBalanceLockSupported()Z
-   isSmoothZoomSupported()Z
-   isVideoSnapshotSupported()Z
-   isVideoStabilizationSupported()Z
-   isZoomSupported()Z
-   remove(LString;)V
-   removeGpsData()V
-   set(LString;I)V
-   set(LString;LString;)V
-   setAntibanding(LString;)V
-   setAutoExposureLock(Z)V
-   setAutoWhiteBalanceLock(Z)V
-   setColorEffect(LString;)V
-   setExposureCompensation(I)V
-   setFlashMode(LString;)V
-   setFocusAreas(LList;)V
-   setFocusMode(LString;)V
-   setGpsAltitude(D)V
-   setGpsLatitude(D)V
-   setGpsLongitude(D)V
-   setGpsProcessingMethod(LString;)V
-   setGpsTimestamp(J)V
-   setJpegQuality(I)V
-   setJpegThumbnailQuality(I)V
-   setJpegThumbnailSize(II)V
-   setMeteringAreas(LList;)V
-   setPictureFormat(I)V
-   setPictureSize(II)V
-   setPreviewFormat(I)V
-   setPreviewFpsRange(II)V
-   setPreviewSize(II)V
-   setRecordingHint(Z)V
-   setRotation(I)V
-   setSceneMode(LString;)V
-   setVideoStabilization(Z)V
-   setWhiteBalance(LString;)V
-   setZoom(I)V
-   unflatten(LString;)V
```


```diff
android/hardware/Camera$PictureCallback
-   onPictureTaken([BLCamera;)V
```


```diff
android/hardware/Camera$PreviewCallback
-   onPreviewFrame([BLCamera;)V
```


```diff
android/hardware/Camera$ShutterCallback
-   onShutter()V
```


```diff
android/hardware/Camera$Size
-   height
-   width
-   <init>(LCamera;II)V
```


```diff
android/hardware/HardwareBuffer
+   isSupported(IIIIJ)Z
```


```diff
android/hardware/SensorListener
-   onAccuracyChanged(II)V
-   onSensorChanged(I[F)V
```


```diff
+android/hardware/biometrics/BiometricManager
```


```diff
android/hardware/biometrics/BiometricPrompt
+   BIOMETRIC_ERROR_NO_DEVICE_CREDENTIAL
```


```diff
android/hardware/biometrics/BiometricPrompt$Builder
+   setConfirmationRequired(Z)LBuilder;
+   setDeviceCredentialAllowed(Z)LBuilder;
```


```diff
android/hardware/camera2/CameraCharacteristics
+   SCALER_MANDATORY_STREAM_COMBINATIONS
+   getKeysNeedingPermission()LList;
+   getRecommendedStreamConfigurationMap(I)LRecommendedStreamConfigurationMap;
```


```diff
android/hardware/camera2/CameraCharacteristics$Key
+   <init>(LString;LClass;)V
```


```diff
android/hardware/camera2/CameraDevice
+   isSessionConfigurationSupported(LSessionConfiguration;)Z
```


```diff
android/hardware/camera2/CameraManager$AvailabilityCallback
+   onCameraAccessPrioritiesChanged()V
```


```diff
android/hardware/camera2/CameraMetadata
+   REQUEST_AVAILABLE_CAPABILITIES_SECURE_IMAGE_DATA
+   SENSOR_INFO_COLOR_FILTER_ARRANGEMENT_MONO
+   SENSOR_INFO_COLOR_FILTER_ARRANGEMENT_NIR
```


```diff
android/hardware/camera2/CaptureFailure
+   getPhysicalCameraId()LString;
```


```diff
android/hardware/camera2/CaptureRequest$Key
+   <init>(LString;LClass;)V
```


```diff
android/hardware/camera2/CaptureResult
+   LOGICAL_MULTI_CAMERA_ACTIVE_PHYSICAL_ID
```


```diff
android/hardware/camera2/CaptureResult$Key
+   <init>(LString;LClass;)V
```


```diff
+android/hardware/camera2/params/MandatoryStreamCombination
```


```diff
+android/hardware/camera2/params/MandatoryStreamCombination$MandatoryStreamInformation
```


```diff
+android/hardware/camera2/params/RecommendedStreamConfigurationMap
```


```diff
android/hardware/camera2/params/SessionConfiguration
+   CREATOR
```


```diff
android/hardware/fingerprint/FingerprintManager$AuthenticationCallback
-   <init>()V
-   onAuthenticationError(ILCharSequence;)V
-   onAuthenticationFailed()V
-   onAuthenticationHelp(ILCharSequence;)V
-   onAuthenticationSucceeded(LAuthenticationResult;)V
```


```diff
android/hardware/fingerprint/FingerprintManager$AuthenticationResult
-   getCryptoObject()LCryptoObject;
```


```diff
android/hardware/fingerprint/FingerprintManager$CryptoObject
-   <init>(LCipher;)V
-   <init>(LMac;)V
-   <init>(LSignature;)V
-   getCipher()LCipher;
-   getMac()LMac;
-   getSignature()LSignature;
```


```diff
+android/icu/lang/UCharacter$IndicPositionalCategory
```


```diff
+android/icu/lang/UCharacter$IndicSyllabicCategory
```


```diff
android/icu/lang/UCharacter$JoiningGroup
+   HANIFI_ROHINGYA_KINNA_YA
+   HANIFI_ROHINGYA_PA
```


```diff
android/icu/lang/UCharacter$UnicodeBlock
+   CHESS_SYMBOLS
+   CHESS_SYMBOLS_ID
+   DOGRA
+   DOGRA_ID
+   GEORGIAN_EXTENDED
+   GEORGIAN_EXTENDED_ID
+   GUNJALA_GONDI
+   GUNJALA_GONDI_ID
+   HANIFI_ROHINGYA
+   HANIFI_ROHINGYA_ID
+   INDIC_SIYAQ_NUMBERS
+   INDIC_SIYAQ_NUMBERS_ID
+   MAKASAR
+   MAKASAR_ID
+   MAYAN_NUMERALS
+   MAYAN_NUMERALS_ID
+   MEDEFAIDRIN
+   MEDEFAIDRIN_ID
+   OLD_SOGDIAN
+   OLD_SOGDIAN_ID
+   SOGDIAN
+   SOGDIAN_ID
```


```diff
+android/icu/lang/UCharacter$VerticalOrientation
```


```diff
android/icu/lang/UCharacter$WordBreak
+   WSEGSPACE
```


```diff
android/icu/lang/UProperty
+   EXTENDED_PICTOGRAPHIC
+   INDIC_POSITIONAL_CATEGORY
+   INDIC_SYLLABIC_CATEGORY
+   VERTICAL_ORIENTATION
```


```diff
android/icu/lang/UScript
+   DOGRA
+   GUNJALA_GONDI
+   HANIFI_ROHINGYA
+   MAKASAR
+   MEDEFAIDRIN
+   OLD_SOGDIAN
+   SOGDIAN
```


```diff
+android/icu/text/Bidi
```


```diff
+android/icu/text/BidiClassifier
```


```diff
+android/icu/text/BidiRun
```


```diff
android/icu/text/BreakIterator
-   KIND_TITLE
-   getTitleInstance()LBreakIterator;
-   getTitleInstance(LLocale;)LBreakIterator;
-   getTitleInstance(LULocale;)LBreakIterator;
+   setText(LCharSequence;)V
```


```diff
+android/icu/text/CaseMap
```


```diff
+android/icu/text/CaseMap$Fold
```


```diff
+android/icu/text/CaseMap$Lower
```


```diff
+android/icu/text/CaseMap$Title
```


```diff
+android/icu/text/CaseMap$Upper
```


```diff
android/icu/text/DecimalFormatSymbols
+   forNumberingSystem(LLocale;LNumberingSystem;)LDecimalFormatSymbols;
+   forNumberingSystem(LULocale;LNumberingSystem;)LDecimalFormatSymbols;
```


```diff
+android/icu/text/Edits
```


```diff
+android/icu/text/Edits$Iterator
```


```diff
android/icu/text/NumberingSystem
+   LATIN
```


```diff
+android/icu/text/Transliterator
```


```diff
+android/icu/text/Transliterator$Position
```


```diff
android/icu/util/Currency
+   fromJavaCurrency(LCurrency;)LCurrency;
+   toJavaCurrency()LCurrency;
```


```diff
android/icu/util/CurrencyAmount
+   <init>(DLCurrency;)V
+   <init>(LNumber;LCurrency;)V
```


```diff
android/icu/util/JapaneseCalendar
-   CURRENT_ERA
```


```diff
android/icu/util/MeasureUnit
+   POINT
```


```diff
android/icu/util/VersionInfo
+   UNICODE_11_0
```


```diff
android/inputmethodservice/InputMethodService
-   getInputMethodWindowRecommendedHeight()I
-   onViewClicked(Z)V
```


```diff
-android/inputmethodservice/Keyboard
-   EDGE_BOTTOM
-   EDGE_LEFT
-   EDGE_RIGHT
-   EDGE_TOP
-   KEYCODE_ALT
-   KEYCODE_CANCEL
-   KEYCODE_DELETE
-   KEYCODE_DONE
-   KEYCODE_MODE_CHANGE
-   KEYCODE_SHIFT
-   <init>(LContext;I)V
-   <init>(LContext;II)V
-   <init>(LContext;IIII)V
-   <init>(LContext;ILCharSequence;II)V
-   createKeyFromXml(LResources;LRow;IILXmlResourceParser;)LKey;
-   createRowFromXml(LResources;LXmlResourceParser;)LRow;
-   getHeight()I
-   getHorizontalGap()I
-   getKeyHeight()I
-   getKeyWidth()I
-   getKeys()LList;
-   getMinWidth()I
-   getModifierKeys()LList;
-   getNearestKeys(II)[I
-   getShiftKeyIndex()I
-   getVerticalGap()I
-   isShifted()Z
-   setHorizontalGap(I)V
-   setKeyHeight(I)V
-   setKeyWidth(I)V
-   setShifted(Z)Z
-   setVerticalGap(I)V
```


```diff
-android/inputmethodservice/Keyboard$Key
-   codes
-   edgeFlags
-   gap
-   height
-   icon
-   iconPreview
-   label
-   modifier
-   on
-   popupCharacters
-   popupResId
-   pressed
-   repeatable
-   sticky
-   text
-   width
-   x
-   y
-   <init>(LResources;LRow;IILXmlResourceParser;)V
-   <init>(LRow;)V
-   getCurrentDrawableState()[I
-   isInside(II)Z
-   onPressed()V
-   onReleased(Z)V
-   squaredDistanceFrom(II)I
```


```diff
-android/inputmethodservice/Keyboard$Row
-   defaultHeight
-   defaultHorizontalGap
-   defaultWidth
-   mode
-   rowEdgeFlags
-   verticalGap
-   <init>(LKeyboard;)V
-   <init>(LResources;LKeyboard;LXmlResourceParser;)V
```


```diff
-android/inputmethodservice/KeyboardView
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   closing()V
-   getKeyboard()LKeyboard;
-   getOnKeyboardActionListener()LOnKeyboardActionListener;
-   handleBack()Z
-   invalidateAllKeys()V
-   invalidateKey(I)V
-   isPreviewEnabled()Z
-   isProximityCorrectionEnabled()Z
-   isShifted()Z
-   onLongPress(LKey;)Z
-   setKeyboard(LKeyboard;)V
-   setOnKeyboardActionListener(LOnKeyboardActionListener;)V
-   setPopupOffset(II)V
-   setPopupParent(LView;)V
-   setPreviewEnabled(Z)V
-   setProximityCorrectionEnabled(Z)V
-   setShifted(Z)Z
-   setVerticalCorrection(I)V
-   swipeDown()V
-   swipeLeft()V
-   swipeRight()V
-   swipeUp()V
```


```diff
-android/inputmethodservice/KeyboardView$OnKeyboardActionListener
-   onKey(I[I)V
-   onPress(I)V
-   onRelease(I)V
-   onText(LCharSequence;)V
-   swipeDown()V
-   swipeLeft()V
-   swipeRight()V
-   swipeUp()V
```


```diff
android/location/GnssClock
+   getElapsedRealtimeNanos()J
+   getElapsedRealtimeUncertaintyNanos()D
+   hasElapsedRealtimeNanos()Z
+   hasElapsedRealtimeUncertaintyNanos()Z
```


```diff
android/location/GnssMeasurement
+   STATE_2ND_CODE_LOCK
+   getCodeType()LString;
+   hasCodeType()Z
```


```diff
android/location/GnssStatus
+   CONSTELLATION_IRNSS
```


```diff
android/location/GpsSatellite
-   getAzimuth()F
-   getElevation()F
-   getPrn()I
-   getSnr()F
-   hasAlmanac()Z
-   hasEphemeris()Z
-   usedInFix()Z
```


```diff
android/location/GpsStatus
-   GPS_EVENT_FIRST_FIX
-   GPS_EVENT_SATELLITE_STATUS
-   GPS_EVENT_STARTED
-   GPS_EVENT_STOPPED
-   getMaxSatellites()I
-   getSatellites()LIterable;
-   getTimeToFirstFix()I
```


```diff
android/location/GpsStatus$Listener
-   onGpsStatusChanged(I)V
```


```diff
android/location/GpsStatus$NmeaListener
-   onNmeaReceived(JLString;)V
```


```diff
android/location/Location
+   getElapsedRealtimeUncertaintyNanos()D
+   hasElapsedRealtimeUncertaintyNanos()Z
+   setElapsedRealtimeUncertaintyNanos(D)V
```


```diff
android/location/LocationListener
-   onStatusChanged(LString;ILBundle;)V
```


```diff
android/location/LocationManager
+   EXTRA_PROVIDER_NAME
-   KEY_STATUS_CHANGED
-   clearTestProviderEnabled(LString;)V
-   clearTestProviderLocation(LString;)V
-   clearTestProviderStatus(LString;)V
-   setTestProviderStatus(LString;ILBundle;J)V
```


```diff
android/location/LocationProvider
-   AVAILABLE
-   OUT_OF_SERVICE
-   TEMPORARILY_UNAVAILABLE
```


```diff
android/location/SettingInjectorService
+   refreshSettings(LContext;)V
```


```diff
android/media/AudioAttributes
+   ALLOW_CAPTURE_BY_ALL
+   ALLOW_CAPTURE_BY_NONE
+   ALLOW_CAPTURE_BY_SYSTEM
+   areHapticChannelsMuted()Z
+   getAllowedCapturePolicy()I
```


```diff
android/media/AudioAttributes$Builder
+   setAllowedCapturePolicy(I)LBuilder;
+   setHapticChannelsMuted(Z)LBuilder;
```


```diff
android/media/AudioFormat
+   ENCODING_DOLBY_MAT
+   getFrameSizeInBytes()I
```


```diff
android/media/AudioManager
+   ACTION_SPEAKERPHONE_STATE_CHANGED
+   getAllowedCapturePolicy()I
+   isHapticPlaybackSupported()Z
+   isOffloadedPlaybackSupported(LAudioFormat;LAudioAttributes;)Z
+   setAllowedCapturePolicy(I)V
```


```diff
+android/media/AudioPlaybackCaptureConfiguration
```


```diff
+android/media/AudioPlaybackCaptureConfiguration$Builder
```


```diff
android/media/AudioPresentation
+   getPresentationId()I
+   getProgramId()I
```


```diff
+android/media/AudioPresentation$Builder
```


```diff
android/media/AudioRecord$Builder
+   setAudioPlaybackCaptureConfig(LAudioPlaybackCaptureConfiguration;)LBuilder;
```


```diff
android/media/AudioRecord$MetricsConstants
-   LATENCY
```


```diff
android/media/AudioRecord$OnRoutingChangedListener
-   onRoutingChanged(LAudioRecord;)V
```


```diff
android/media/AudioRecordingConfiguration
+   getAudioSource()I
+   getClientEffects()LList;
+   getEffects()LList;
+   isClientSilenced()Z
```


```diff
+android/media/AudioRecordingMonitor
```


```diff
android/media/AudioTrack
+   getAudioAttributes()LAudioAttributes;
+   getOffloadDelay()I
+   getOffloadPadding()I
+   isDirectPlaybackSupported(LAudioFormat;LAudioAttributes;)Z
+   isOffloadedPlayback()Z
+   registerStreamEventCallback(LExecutor;LStreamEventCallback;)V
+   setOffloadDelayPadding(II)V
+   setOffloadEndOfStream()V
+   unregisterStreamEventCallback(LStreamEventCallback;)V
```


```diff
android/media/AudioTrack$Builder
+   setOffloadedPlayback(Z)LBuilder;
```


```diff
android/media/AudioTrack$MetricsConstants
-   CHANNELMASK
-   SAMPLERATE
```


```diff
android/media/AudioTrack$OnRoutingChangedListener
-   onRoutingChanged(LAudioTrack;)V
```


```diff
+android/media/AudioTrack$StreamEventCallback
```


```diff
android/media/ExifInterface
+   TAG_XMP
+   <init>(LFile;)V
+   getAttributeBytes(LString;)[B
+   getAttributeRange(LString;)[J
+   hasAttribute(LString;)Z
```


```diff
android/media/ImageReader
+   newInstance(IIIIJ)LImageReader;
```


```diff
android/media/ImageWriter
+   newInstance(LSurface;II)LImageWriter;
```


```diff
android/media/MediaCas$EventListener
+   onSessionEvent(LMediaCas;LSession;II[B)V
```


```diff
android/media/MediaCas$Session
+   sendSessionEvent(II[B)V
```


```diff
android/media/MediaCodec
+   PARAMETER_KEY_HDR10_PLUS_INFO
+   PARAMETER_KEY_OFFSET_TIME
+   PARAMETER_KEY_SUSPEND_TIME
+   getCanonicalName()LString;
+   setAudioPresentation(LAudioPresentation;)V
```


```diff
android/media/MediaCodec$CryptoException
+   ERROR_FRAME_TOO_LARGE
+   ERROR_INSUFFICIENT_SECURITY
+   ERROR_LOST_STATE
```


```diff
android/media/MediaCodecInfo
+   getCanonicalName()LString;
+   isAlias()Z
+   isHardwareAccelerated()Z
+   isSoftwareOnly()Z
+   isVendor()Z
```


```diff
android/media/MediaCodecInfo$CodecCapabilities
+   FEATURE_DynamicTimestamp
+   FEATURE_FrameParsing
+   FEATURE_MultipleFrames
```


```diff
android/media/MediaCodecInfo$CodecProfileLevel
+   AV1Level2
+   AV1Level21
+   AV1Level22
+   AV1Level23
+   AV1Level3
+   AV1Level31
+   AV1Level32
+   AV1Level33
+   AV1Level4
+   AV1Level41
+   AV1Level42
+   AV1Level43
+   AV1Level5
+   AV1Level51
+   AV1Level52
+   AV1Level53
+   AV1Level6
+   AV1Level61
+   AV1Level62
+   AV1Level63
+   AV1Level7
+   AV1Level71
+   AV1Level72
+   AV1Level73
+   AV1ProfileMain10
+   AV1ProfileMain10HDR10
+   AV1ProfileMain10HDR10Plus
+   AV1ProfileMain8
+   AVCLevel6
+   AVCLevel61
+   AVCLevel62
+   HEVCProfileMain10HDR10Plus
+   VP9Profile2HDR10Plus
+   VP9Profile3HDR10Plus
```


```diff
android/media/MediaCodecInfo$VideoCapabilities
+   getSupportedPerformancePoints()LList;
```


```diff
+android/media/MediaCodecInfo$VideoCapabilities$PerformancePoint
```


```diff
+android/media/MediaController2
```


```diff
+android/media/MediaController2$Builder
```


```diff
+android/media/MediaController2$ControllerCallback
```


```diff
android/media/MediaDrm
+   HDCP_V2_3
+   OFFLINE_LICENSE_STATE_RELEASED
+   OFFLINE_LICENSE_STATE_UNKNOWN
+   OFFLINE_LICENSE_STATE_USABLE
+   clearOnEventListener()V
+   clearOnExpirationUpdateListener()V
+   clearOnKeyStatusChangeListener()V
+   clearOnSessionLostStateListener()V
+   getOfflineLicenseKeySetIds()LList;
+   getOfflineLicenseState([B)I
+   isCryptoSchemeSupported(LUUID;LString;I)Z
+   removeOfflineLicense([B)V
+   setOnEventListener(LExecutor;LOnEventListener;)V
+   setOnEventListener(LOnEventListener;LHandler;)V
+   setOnExpirationUpdateListener(LExecutor;LOnExpirationUpdateListener;)V
+   setOnKeyStatusChangeListener(LExecutor;LOnKeyStatusChangeListener;)V
+   setOnSessionLostStateListener(LExecutor;LOnSessionLostStateListener;)V
+   setOnSessionLostStateListener(LOnSessionLostStateListener;LHandler;)V
```


```diff
-android/media/MediaDrm$HdcpLevel
```


```diff
android/media/MediaDrm$KeyStatus
+   STATUS_USABLE_IN_FUTURE
```


```diff
+android/media/MediaDrm$OnSessionLostStateListener
```


```diff
-android/media/MediaDrm$SecurityLevel
```


```diff
+android/media/MediaDrm$SessionException
```


```diff
android/media/MediaExtractor$CasInfo
+   getPrivateData()[B
```


```diff
android/media/MediaFormat
+   KEY_CREATE_INPUT_SURFACE_SUSPENDED
+   KEY_HAPTIC_CHANNEL_COUNT
+   KEY_HDR10_PLUS_INFO
+   KEY_MAX_B_FRAMES
+   KEY_MAX_FPS_TO_ENCODER
+   KEY_MAX_PTS_GAP_TO_ENCODER
+   KEY_PREPEND_HEADER_TO_SYNC_FRAMES
+   MIMETYPE_AUDIO_AC4
+   MIMETYPE_AUDIO_EAC3_JOC
+   MIMETYPE_VIDEO_AV1
+   TYPE_BYTE_BUFFER
+   TYPE_FLOAT
+   TYPE_INTEGER
+   TYPE_LONG
+   TYPE_NULL
+   TYPE_STRING
+   <init>(LMediaFormat;)V
+   containsFeature(LString;)Z
+   getByteBuffer(LString;LByteBuffer;)LByteBuffer;
+   getFeatures()LSet;
+   getFloat(LString;F)F
+   getInteger(LString;I)I
+   getKeys()LSet;
+   getLong(LString;J)J
+   getNumber(LString;)LNumber;
+   getNumber(LString;LNumber;)LNumber;
+   getString(LString;LString;)LString;
+   getValueTypeForKey(LString;)I
+   removeFeature(LString;)V
+   removeKey(LString;)V
```


```diff
android/media/MediaMetadataEditor
-   BITMAP_KEY_ARTWORK
-   RATING_KEY_BY_OTHERS
-   RATING_KEY_BY_USER
-   addEditableKey(I)V
-   apply()V
-   clear()V
-   getBitmap(ILBitmap;)LBitmap;
-   getEditableKeys()[I
-   getLong(IJ)J
-   getObject(ILObject;)LObject;
-   getString(ILString;)LString;
-   putBitmap(ILBitmap;)LMediaMetadataEditor;
-   putLong(IJ)LMediaMetadataEditor;
-   putObject(ILObject;)LMediaMetadataEditor;
-   putString(ILString;)LMediaMetadataEditor;
-   removeEditableKeys()V
```


```diff
android/media/MediaMetadataRetriever
+   METADATA_KEY_EXIF_LENGTH
+   METADATA_KEY_EXIF_OFFSET
```


```diff
android/media/MediaMuxer$OutputFormat
+   MUXER_OUTPUT_OGG
```


```diff
android/media/MediaRecorder$AudioEncoder
+   OPUS
```


```diff
android/media/MediaRecorder$AudioSource
+   VOICE_PERFORMANCE
```


```diff
android/media/MediaRecorder$OutputFormat
+   OGG
```


```diff
+android/media/MediaSession2
```


```diff
+android/media/MediaSession2$Builder
```


```diff
+android/media/MediaSession2$ControllerInfo
```


```diff
+android/media/MediaSession2$SessionCallback
```


```diff
+android/media/MediaSession2Service
```


```diff
+android/media/MediaSession2Service$MediaNotification
```


```diff
android/media/MediaTimestamp
+   <init>(JJF)V
+   getAnchorSystemNanoTime()J
-   getAnchorSytemNanoTime()J
```


```diff
+android/media/MicrophoneDirection
```


```diff
android/media/RemoteControlClient
-   FLAG_KEY_MEDIA_FAST_FORWARD
-   FLAG_KEY_MEDIA_NEXT
-   FLAG_KEY_MEDIA_PAUSE
-   FLAG_KEY_MEDIA_PLAY
-   FLAG_KEY_MEDIA_PLAY_PAUSE
-   FLAG_KEY_MEDIA_POSITION_UPDATE
-   FLAG_KEY_MEDIA_PREVIOUS
-   FLAG_KEY_MEDIA_RATING
-   FLAG_KEY_MEDIA_REWIND
-   FLAG_KEY_MEDIA_STOP
-   PLAYSTATE_BUFFERING
-   PLAYSTATE_ERROR
-   PLAYSTATE_FAST_FORWARDING
-   PLAYSTATE_PAUSED
-   PLAYSTATE_PLAYING
-   PLAYSTATE_REWINDING
-   PLAYSTATE_SKIPPING_BACKWARDS
-   PLAYSTATE_SKIPPING_FORWARDS
-   PLAYSTATE_STOPPED
-   <init>(LPendingIntent;)V
-   <init>(LPendingIntent;LLooper;)V
-   editMetadata(Z)LMetadataEditor;
-   getMediaSession()LMediaSession;
-   setMetadataUpdateListener(LOnMetadataUpdateListener;)V
-   setOnGetPlaybackPositionListener(LOnGetPlaybackPositionListener;)V
-   setPlaybackPositionUpdateListener(LOnPlaybackPositionUpdateListener;)V
-   setPlaybackState(I)V
-   setPlaybackState(IJF)V
-   setTransportControlFlags(I)V
```


```diff
android/media/RemoteControlClient$MetadataEditor
-   BITMAP_KEY_ARTWORK
-   apply()V
-   clear()V
-   putBitmap(ILBitmap;)LMetadataEditor;
-   putLong(IJ)LMetadataEditor;
-   putObject(ILObject;)LMetadataEditor;
-   putString(ILString;)LMetadataEditor;
```


```diff
-android/media/RemoteControlClient$OnGetPlaybackPositionListener
-   onGetPlaybackPosition()J
```


```diff
-android/media/RemoteControlClient$OnMetadataUpdateListener
-   onMetadataUpdate(ILObject;)V
```


```diff
-android/media/RemoteControlClient$OnPlaybackPositionUpdateListener
-   onPlaybackPositionUpdate(J)V
```


```diff
android/media/RemoteController
-   POSITION_SYNCHRONIZATION_CHECK
-   POSITION_SYNCHRONIZATION_NONE
-   <init>(LContext;LOnClientUpdateListener;)V
-   <init>(LContext;LOnClientUpdateListener;LLooper;)V
-   clearArtworkConfiguration()Z
-   editMetadata()LMetadataEditor;
-   getEstimatedMediaPosition()J
-   seekTo(J)Z
-   sendMediaKeyEvent(LKeyEvent;)Z
-   setArtworkConfiguration(II)Z
-   setSynchronizationMode(I)Z
```


```diff
-android/media/RemoteController$MetadataEditor
```


```diff
-android/media/RemoteController$OnClientUpdateListener
-   onClientChange(Z)V
-   onClientMetadataUpdate(LMetadataEditor;)V
-   onClientPlaybackStateUpdate(I)V
-   onClientPlaybackStateUpdate(IJJF)V
-   onClientTransportControlUpdate(I)V
```


```diff
android/media/RingtoneManager
+   hasHapticChannels(I)Z
+   hasHapticChannels(LUri;)Z
+   openDefaultRingtoneUri(LContext;LUri;)LAssetFileDescriptor;
```


```diff
+android/media/Session2Command
```


```diff
+android/media/Session2Command$Result
```


```diff
+android/media/Session2CommandGroup
```


```diff
+android/media/Session2CommandGroup$Builder
```


```diff
+android/media/Session2Token
```


```diff
android/media/SubtitleData
+   <init>(IJJ[B)V
```


```diff
android/media/ThumbnailUtils
+   createAudioThumbnail(LFile;LSize;LCancellationSignal;)LBitmap;
-+   createAudioThumbnail(LString;I)LBitmap;
+   createImageThumbnail(LFile;LSize;LCancellationSignal;)LBitmap;
-+   createImageThumbnail(LString;I)LBitmap;
+   createVideoThumbnail(LFile;LSize;LCancellationSignal;)LBitmap;
-   createVideoThumbnail(LString;I)LBitmap;
```


```diff
android/media/TimedMetaData
+   <init>(J[B)V
```


```diff
android/media/session/MediaController
+   getSessionInfo()LBundle;
```


```diff
android/media/session/MediaController$PlaybackInfo
+   CREATOR
```


```diff
android/media/session/MediaController$TransportControls
+   setPlaybackSpeed(F)V
```


```diff
android/media/session/MediaSession
+   <init>(LContext;LString;LBundle;)V
```


```diff
android/media/session/MediaSession$Callback
+   onSetPlaybackSpeed(F)V
```


```diff
android/media/session/MediaSessionManager
+   addOnSession2TokensChangedListener(LOnSession2TokensChangedListener;)V
+   addOnSession2TokensChangedListener(LOnSession2TokensChangedListener;LHandler;)V
+   getSession2Tokens()LList;
+   notifySession2Created(LSession2Token;)V
+   removeOnSession2TokensChangedListener(LOnSession2TokensChangedListener;)V
```


```diff
+android/media/session/MediaSessionManager$OnSession2TokensChangedListener
```


```diff
android/media/tv/TvContract$Channels
+   TYPE_ISDB_S3
```


```diff
android/media/tv/TvContract$PreviewPrograms
+   COLUMN_SERIES_ID
```


```diff
android/media/tv/TvContract$Programs
+   COLUMN_SERIES_ID
```


```diff
android/media/tv/TvContract$RecordedPrograms
+   COLUMN_SERIES_ID
```


```diff
android/media/tv/TvContract$WatchNextPrograms
+   COLUMN_SERIES_ID
```


```diff
android/net/ConnectivityManager
-   EXTRA_EXTRA_INFO
-   EXTRA_IS_FAILOVER
-   EXTRA_NETWORK_TYPE
-   EXTRA_OTHER_NETWORK_INFO
+   createSocketKeepalive(LNetwork;LUdpEncapsulationSocket;LInetAddress;LInetAddress;LExecutor;LCallback;)LSocketKeepalive;
-   getActiveNetworkInfo()LNetworkInfo;
+   getConnectionOwnerUid(ILInetSocketAddress;LInetSocketAddress;)I
-   getNetworkInfo(LNetwork;)LNetworkInfo;
```


```diff
android/net/ConnectivityManager$NetworkCallback
+   onBlockedStatusChanged(LNetwork;Z)V
```


```diff
+android/net/DnsResolver
```


```diff
+android/net/DnsResolver$Callback
```


```diff
+android/net/DnsResolver$DnsException
```


```diff
+android/net/InetAddresses
```


```diff
android/net/LinkProperties
+   <init>()V
+   addRoute(LRouteInfo;)Z
+   clear()V
+   getMtu()I
+   setDnsServers(LCollection;)V
+   setDomains(LString;)V
+   setHttpProxy(LProxyInfo;)V
+   setInterfaceName(LString;)V
+   setLinkAddresses(LCollection;)V
+   setMtu(I)V
```


```diff
android/net/NetworkCapabilities
+   NET_CAPABILITY_MCX
+   SIGNAL_STRENGTH_UNSPECIFIED
+   getSignalStrength()I
+   getTransportInfo()LTransportInfo;
```


```diff
-android/net/NetworkInfo
-   CREATOR
-   getDetailedState()LDetailedState;
-   getExtraInfo()LString;
-   getSubtype()I
-   getSubtypeName()LString;
-   isConnected()Z
```


```diff
-android/net/NetworkInfo$DetailedState
-   AUTHENTICATING
-   BLOCKED
-   CAPTIVE_PORTAL_CHECK
-   CONNECTED
-   CONNECTING
-   DISCONNECTED
-   DISCONNECTING
-   FAILED
-   IDLE
-   OBTAINING_IPADDR
-   SCANNING
-   SUSPENDED
-   VERIFYING_POOR_LINK
```


```diff
-android/net/NetworkInfo$State
-   CONNECTED
-   CONNECTING
-   DISCONNECTED
-   DISCONNECTING
-   SUSPENDED
-   UNKNOWN
```


```diff
android/net/NetworkSpecifier
+   <init>()V
```


```diff
android/net/RouteInfo
+   hasGateway()Z
```


```diff
-android/net/SSLCertificateSocketFactory
-   getDefault(I)LSocketFactory;
-   getDefault(ILSSLSessionCache;)LSSLSocketFactory;
-   getInsecure(ILSSLSessionCache;)LSSLSocketFactory;
-   getNpnSelectedProtocol(LSocket;)[B
-   setHostname(LSocket;LString;)V
-   setKeyManagers([LKeyManager;)V
-   setNpnProtocols([[B)V
-   setTrustManagers([LTrustManager;)V
-   setUseSessionTickets(LSocket;Z)V
```


```diff
+android/net/SocketKeepalive
```


```diff
+android/net/SocketKeepalive$Callback
```


```diff
+android/net/TransportInfo
```


```diff
android/net/VpnService
+   isAlwaysOn()Z
+   isLockdownEnabled()Z
```


```diff
android/net/VpnService$Builder
+   setHttpProxy(LProxyInfo;)LBuilder;
+   setMetered(Z)LBuilder;
```


```diff
android/net/http/SslCertificate
+   getX509Certificate()LX509Certificate;
```


```diff
+android/net/ssl/SSLEngines
```


```diff
+android/net/ssl/SSLSockets
```


```diff
-android/net/wifi/WifiConfiguration
-   BSSID
-   FQDN
-   SSID
-   allowedAuthAlgorithms
-   allowedGroupCiphers
-+   allowedGroupManagementCiphers
-   allowedKeyManagement
-   allowedPairwiseCiphers
-   allowedProtocols
-+   allowedSuiteBCiphers
-   enterpriseConfig
-   hiddenSSID
-   isHomeProviderNetwork
-   networkId
-   preSharedKey
-   providerFriendlyName
-   roamingConsortiumIds
-   status
-   <init>()V
-   getHttpProxy()LProxyInfo;
-+   getRandomizedMacAddress()LMacAddress;
-   isPasspoint()Z
-   setHttpProxy(LProxyInfo;)V
```


```diff
-android/net/wifi/WifiConfiguration$AuthAlgorithm
-   LEAP
-   OPEN
-   strings
-   varName
```


```diff
-android/net/wifi/WifiConfiguration$GroupCipher
-   CCMP
-+   GCMP_256
-   TKIP
-   strings
-   varName
```


```diff
-+android/net/wifi/WifiConfiguration$GroupMgmtCipher
-   BIP_CMAC_256
-   BIP_GMAC_128
-   BIP_GMAC_256
```


```diff
-android/net/wifi/WifiConfiguration$KeyMgmt
-   IEEE8021X
-   NONE
-+   OWE
-+   SAE
-+   SUITE_B_192
-   WPA_EAP
-   WPA_PSK
-   strings
-   varName
```


```diff
-android/net/wifi/WifiConfiguration$PairwiseCipher
-   CCMP
-+   GCMP_256
-   NONE
-   strings
-   varName
```


```diff
-android/net/wifi/WifiConfiguration$Protocol
-   RSN
-   strings
-   varName
```


```diff
-android/net/wifi/WifiConfiguration$Status
-   CURRENT
-   DISABLED
-   ENABLED
-   strings
```


```diff
android/net/wifi/WifiInfo
+   LINK_SPEED_UNKNOWN
+   getPasspointFqdn()LString;
+   getPasspointProviderFriendlyName()LString;
+   getRxLinkSpeedMbps()I
+   getTxLinkSpeedMbps()I
```


```diff
android/net/wifi/WifiManager
+   ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION
+   EXTRA_NETWORK_SUGGESTION
+   STATUS_NETWORK_SUGGESTIONS_ERROR_ADD_DUPLICATE
+   STATUS_NETWORK_SUGGESTIONS_ERROR_ADD_EXCEEDS_MAX_PER_APP
+   STATUS_NETWORK_SUGGESTIONS_ERROR_APP_DISALLOWED
+   STATUS_NETWORK_SUGGESTIONS_ERROR_INTERNAL
+   STATUS_NETWORK_SUGGESTIONS_ERROR_REMOVE_INVALID
+   STATUS_NETWORK_SUGGESTIONS_SUCCESS
-   WIFI_MODE_FULL
+   WIFI_MODE_FULL_LOW_LATENCY
-   WIFI_MODE_SCAN_ONLY
-   addNetwork(LWifiConfiguration;)I
+   addNetworkSuggestions(LList;)I
-   createWifiLock(LString;)LWifiLock;
-   disableNetwork(I)Z
-   disconnect()Z
-   enableNetwork(IZ)Z
-   getConfiguredNetworks()LList;
+   getMaxNumberOfNetworkSuggestionsPerApp()I
-   getPasspointConfigurations()LList;
-   isDeviceToApRttSupported()Z
+   isEasyConnectSupported()Z
+   isEnhancedOpenSupported()Z
-   isScanAlwaysAvailable()Z
+   isWpa3SaeSupported()Z
+   isWpa3SuiteBSupported()Z
-   reassociate()Z
-   reconnect()Z
-   removeNetwork(I)Z
+   removeNetworkSuggestions(LList;)I
-   removePasspointConfiguration(LString;)V
-   setWifiEnabled(Z)Z
-   updateNetwork(LWifiConfiguration;)I
```


```diff
android/net/wifi/WifiManager$WpsCallback
-   <init>()V
```


```diff
+android/net/wifi/WifiNetworkSpecifier
```


```diff
+android/net/wifi/WifiNetworkSpecifier$Builder
```


```diff
+android/net/wifi/WifiNetworkSuggestion
```


```diff
+android/net/wifi/WifiNetworkSuggestion$Builder
```


```diff
android/net/wifi/aware/DiscoverySession
-   createNetworkSpecifierOpen(LPeerHandle;)LNetworkSpecifier;
-   createNetworkSpecifierPassphrase(LPeerHandle;LString;)LNetworkSpecifier;
```


```diff
+android/net/wifi/aware/ParcelablePeerHandle
```


```diff
+android/net/wifi/aware/WifiAwareNetworkInfo
```


```diff
+android/net/wifi/aware/WifiAwareNetworkSpecifier
```


```diff
+android/net/wifi/aware/WifiAwareNetworkSpecifier$Builder
```


```diff
android/net/wifi/p2p/WifiP2pConfig
+   GROUP_OWNER_BAND_2GHZ
+   GROUP_OWNER_BAND_5GHZ
+   GROUP_OWNER_BAND_AUTO
```


```diff
+android/net/wifi/p2p/WifiP2pConfig$Builder
```


```diff
android/net/wifi/p2p/WifiP2pGroup
+   getFrequency()I
```


```diff
android/net/wifi/p2p/WifiP2pManager
+   createGroup(LChannel;LWifiP2pConfig;LActionListener;)V
+   requestDeviceInfo(LChannel;LDeviceInfoListener;)V
+   requestDiscoveryState(LChannel;LDiscoveryStateListener;)V
+   requestNetworkInfo(LChannel;LNetworkInfoListener;)V
+   requestP2pState(LChannel;LP2pStateListener;)V
```


```diff
+android/net/wifi/p2p/WifiP2pManager$DeviceInfoListener
```


```diff
+android/net/wifi/p2p/WifiP2pManager$DiscoveryStateListener
```


```diff
+android/net/wifi/p2p/WifiP2pManager$NetworkInfoListener
```


```diff
+android/net/wifi/p2p/WifiP2pManager$P2pStateListener
```


```diff
+android/net/wifi/rtt/CivicLocationKeys
```


```diff
android/net/wifi/rtt/RangingResult
+   getUnverifiedResponderLocation()LResponderLocation;
```


```diff
+android/net/wifi/rtt/ResponderLocation
```


```diff
android/nfc/NfcAdapter
-   invokeBeam(LActivity;)Z
-   isNdefPushEnabled()Z
+   isSecureNfcEnabled()Z
+   isSecureNfcSupported()Z
-   setBeamPushUris([LUri;LActivity;)V
-   setBeamPushUrisCallback(LCreateBeamUrisCallback;LActivity;)V
-   setNdefPushMessage(LNdefMessage;LActivity;[LActivity;)V
-   setNdefPushMessageCallback(LCreateNdefMessageCallback;LActivity;[LActivity;)V
-   setOnNdefPushCompleteCallback(LOnNdefPushCompleteCallback;LActivity;[LActivity;)V
```


```diff
-android/nfc/NfcAdapter$CreateBeamUrisCallback
-   createBeamUris(LNfcEvent;)[LUri;
```


```diff
-android/nfc/NfcAdapter$CreateNdefMessageCallback
-   createNdefMessage(LNfcEvent;)LNdefMessage;
```


```diff
-android/nfc/NfcAdapter$OnNdefPushCompleteCallback
-   onNdefPushComplete(LNfcEvent;)V
```


```diff
android/nfc/cardemulation/CardEmulation
+   setOffHostForService(LComponentName;LString;)Z
+   unsetOffHostForService(LComponentName;)Z
```


```diff
+android/opengl/EGL15
```


```diff
+android/opengl/EGLImage
```


```diff
+android/opengl/EGLSync
```


```diff
android/os/Binder
+   <init>(LString;)V
+   clearCallingWorkSource()J
+   getCallingUidOrThrow()I
+   getCallingWorkSourceUid()I
+   restoreCallingWorkSource(J)V
+   setCallingWorkSourceUid(I)J
```


```diff
android/os/Build
+   getFingerprintedPartitions()LList;
```


```diff
+android/os/Build$Partition
```


```diff
android/os/Build$VERSION_CODES
+   Q
```


```diff
android/os/Debug$InstructionCount
-   <init>()V
-   collect()Z
-   globalMethodInvocations()I
-   globalTotal()I
-   resetAndStart()Z
```


```diff
android/os/DropBoxManager
+   EXTRA_DROPPED_COUNT
```


```diff
android/os/Environment
+   DIRECTORY_AUDIOBOOKS
+   DIRECTORY_SCREENSHOTS
-   getExternalStorageDirectory()LFile;
-   getExternalStoragePublicDirectory(LString;)LFile;
+   isExternalStorageLegacy()Z
+   isExternalStorageLegacy(LFile;)Z
```


```diff
android/os/FileObserver
+   <init>(LFile;)V
+   <init>(LFile;I)V
+   <init>(LList;)V
+   <init>(LList;I)V
-   <init>(LString;)V
-   <init>(LString;I)V
```


```diff
+android/os/FileUtils
```


```diff
+android/os/FileUtils$ProgressListener
```


```diff
android/os/Handler
+   hasCallbacks(LRunnable;)Z
```


```diff
android/os/LocaleList
+   isPseudoLocale(LULocale;)Z
```


```diff
android/os/Parcel
+   createTypedArrayMap(LCreator;)LArrayMap;
+   createTypedSparseArray(LCreator;)LSparseArray;
+   readBoolean()Z
+   readParcelableList(LList;LClassLoader;)LList;
+   writeBoolean(Z)V
+   writeParcelableList(LList;I)V
+   writeTypedArrayMap(LArrayMap;I)V
+   writeTypedSparseArray(LSparseArray;I)V
```


```diff
android/os/PowerManager
+   LOCATION_MODE_THROTTLE_REQUESTS_WHEN_SCREEN_OFF
+   THERMAL_STATUS_CRITICAL
+   THERMAL_STATUS_EMERGENCY
+   THERMAL_STATUS_LIGHT
+   THERMAL_STATUS_MODERATE
+   THERMAL_STATUS_NONE
+   THERMAL_STATUS_SEVERE
+   THERMAL_STATUS_SHUTDOWN
+   addThermalStatusListener(LExecutor;LOnThermalStatusChangedListener;)V
+   addThermalStatusListener(LOnThermalStatusChangedListener;)V
+   getCurrentThermalStatus()I
+   removeThermalStatusListener(LOnThermalStatusChangedListener;)V
```


```diff
+android/os/PowerManager$OnThermalStatusChangedListener
```


```diff
android/os/Process
+   BLUETOOTH_UID
+   INVALID_UID
+   ROOT_UID
+   SHELL_UID
```


```diff
android/os/StrictMode$VmPolicy$Builder
+   detectCredentialProtectedWhileLocked()Landroid/os/StrictMode$VmPolicy$Builder;
+   detectImplicitDirectBoot()Landroid/os/StrictMode$VmPolicy$Builder;
```


```diff
android/os/SystemClock
+   currentGnssTimeClock()LClock;
```


```diff
android/os/Trace
+   beginAsyncSection(LString;I)V
+   endAsyncSection(LString;I)V
+   isEnabled()Z
+   setCounter(LString;J)V
```


```diff
android/os/UserManager
+   DISALLOW_CONFIG_PRIVATE_DNS
+   DISALLOW_CONTENT_CAPTURE
+   DISALLOW_CONTENT_SUGGESTIONS
+   DISALLOW_INSTALL_UNKNOWN_SOURCES_GLOBALLY
```


```diff
android/os/VibrationEffect
+   EFFECT_CLICK
+   EFFECT_DOUBLE_CLICK
+   EFFECT_HEAVY_CLICK
+   EFFECT_TICK
+   createPredefined(I)LVibrationEffect;
```


```diff
android/os/storage/StorageManager
+   getStorageVolume(LUri;)LStorageVolume;
```


```diff
android/os/storage/StorageVolume
-   createAccessIntent(LString;)LIntent;
+   createOpenDocumentTreeIntent()LIntent;
```


```diff
+android/os/strictmode/CredentialProtectedWhileLockedViolation
```


```diff
+android/os/strictmode/ImplicitDirectBootViolation
```


```diff
-android/preference/CheckBoxPreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
```


```diff
-android/preference/DialogPreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   getDialog()LDialog;
-   getDialogIcon()LDrawable;
-   getDialogLayoutResource()I
-   getDialogMessage()LCharSequence;
-   getDialogTitle()LCharSequence;
-   getNegativeButtonText()LCharSequence;
-   getPositiveButtonText()LCharSequence;
-   onBindDialogView(LView;)V
-   onCreateDialogView()LView;
-   onDialogClosed(Z)V
-   onPrepareDialogBuilder(LBuilder;)V
-   setDialogIcon(I)V
-   setDialogIcon(LDrawable;)V
-   setDialogLayoutResource(I)V
-   setDialogMessage(I)V
-   setDialogMessage(LCharSequence;)V
-   setDialogTitle(I)V
-   setDialogTitle(LCharSequence;)V
-   setNegativeButtonText(I)V
-   setNegativeButtonText(LCharSequence;)V
-   setPositiveButtonText(I)V
-   setPositiveButtonText(LCharSequence;)V
-   showDialog(LBundle;)V
```


```diff
-android/preference/EditTextPreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   getEditText()LEditText;
-   getText()LString;
-   onAddEditTextToDialogView(LView;LEditText;)V
-   setText(LString;)V
```


```diff
-android/preference/ListPreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   findIndexOfValue(LString;)I
-   getEntries()[LCharSequence;
-   getEntry()LCharSequence;
-   getEntryValues()[LCharSequence;
-   getValue()LString;
-   setEntries(I)V
-   setEntries([LCharSequence;)V
-   setEntryValues(I)V
-   setEntryValues([LCharSequence;)V
-   setValue(LString;)V
-   setValueIndex(I)V
```


```diff
-android/preference/MultiSelectListPreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   findIndexOfValue(LString;)I
-   getEntries()[LCharSequence;
-   getEntryValues()[LCharSequence;
-   getValues()LSet;
-   setEntries(I)V
-   setEntries([LCharSequence;)V
-   setEntryValues(I)V
-   setEntryValues([LCharSequence;)V
-   setValues(LSet;)V
```


```diff
-android/preference/Preference
-   DEFAULT_ORDER
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   callChangeListener(LObject;)Z
-   compareTo(LPreference;)I
-   findPreferenceInHierarchy(LString;)LPreference;
-   getContext()LContext;
-   getDependency()LString;
-   getEditor()LEditor;
-   getExtras()LBundle;
-   getFragment()LString;
-   getIcon()LDrawable;
-   getIntent()LIntent;
-   getKey()LString;
-   getLayoutResource()I
-   getOnPreferenceChangeListener()LOnPreferenceChangeListener;
-   getOnPreferenceClickListener()LOnPreferenceClickListener;
-   getOrder()I
-   getParent()LPreferenceGroup;
-   getPersistedBoolean(Z)Z
-   getPersistedFloat(F)F
-   getPersistedInt(I)I
-   getPersistedLong(J)J
-   getPersistedString(LString;)LString;
-   getPersistedStringSet(LSet;)LSet;
-   getPreferenceDataStore()LPreferenceDataStore;
-   getPreferenceManager()LPreferenceManager;
-   getSharedPreferences()LSharedPreferences;
-   getShouldDisableView()Z
-   getSummary()LCharSequence;
-   getTitle()LCharSequence;
-   getTitleRes()I
-   getView(LView;LViewGroup;)LView;
-   getWidgetLayoutResource()I
-   hasKey()Z
-   isEnabled()Z
-   isIconSpaceReserved()Z
-   isPersistent()Z
-   isRecycleEnabled()Z
-   isSelectable()Z
-   isSingleLineTitle()Z
-   notifyChanged()V
-   notifyDependencyChange(Z)V
-   notifyHierarchyChanged()V
-   onAttachedToActivity()V
-   onAttachedToHierarchy(LPreferenceManager;)V
-   onBindView(LView;)V
-   onClick()V
-   onCreateView(LViewGroup;)LView;
-   onDependencyChanged(LPreference;Z)V
-   onGetDefaultValue(LTypedArray;I)LObject;
-   onParentChanged(LPreference;Z)V
-   onPrepareForRemoval()V
-   onRestoreInstanceState(LParcelable;)V
-   onSaveInstanceState()LParcelable;
-   onSetInitialValue(ZLObject;)V
-   peekExtras()LBundle;
-   persistBoolean(Z)Z
-   persistFloat(F)Z
-   persistInt(I)Z
-   persistLong(J)Z
-   persistString(LString;)Z
-   persistStringSet(LSet;)Z
-   restoreHierarchyState(LBundle;)V
-   saveHierarchyState(LBundle;)V
-   setDefaultValue(LObject;)V
-   setDependency(LString;)V
-   setEnabled(Z)V
-   setFragment(LString;)V
-   setIcon(I)V
-   setIcon(LDrawable;)V
-   setIconSpaceReserved(Z)V
-   setIntent(LIntent;)V
-   setKey(LString;)V
-   setLayoutResource(I)V
-   setOnPreferenceChangeListener(LOnPreferenceChangeListener;)V
-   setOnPreferenceClickListener(LOnPreferenceClickListener;)V
-   setOrder(I)V
-   setPersistent(Z)V
-   setPreferenceDataStore(LPreferenceDataStore;)V
-   setRecycleEnabled(Z)V
-   setSelectable(Z)V
-   setShouldDisableView(Z)V
-   setSingleLineTitle(Z)V
-   setSummary(I)V
-   setSummary(LCharSequence;)V
-   setTitle(I)V
-   setTitle(LCharSequence;)V
-   setWidgetLayoutResource(I)V
-   shouldCommit()Z
-   shouldDisableDependents()Z
-   shouldPersist()Z
```


```diff
-android/preference/Preference$BaseSavedState
-   CREATOR
-   <init>(LParcel;)V
-   <init>(LParcelable;)V
```


```diff
-android/preference/Preference$OnPreferenceChangeListener
-   onPreferenceChange(LPreference;LObject;)Z
```


```diff
-android/preference/Preference$OnPreferenceClickListener
-   onPreferenceClick(LPreference;)Z
```


```diff
-android/preference/PreferenceActivity
-   EXTRA_NO_HEADERS
-   EXTRA_SHOW_FRAGMENT
-   EXTRA_SHOW_FRAGMENT_ARGUMENTS
-   EXTRA_SHOW_FRAGMENT_SHORT_TITLE
-   EXTRA_SHOW_FRAGMENT_TITLE
-   HEADER_ID_UNDEFINED
-   <init>()V
-   finishPreferencePanel(LFragment;ILIntent;)V
-   hasHeaders()Z
-   invalidateHeaders()V
-   isMultiPane()Z
-   isValidFragment(LString;)Z
-   loadHeadersFromResource(ILList;)V
-   onBuildHeaders(LList;)V
-   onBuildStartFragmentIntent(LString;LBundle;II)LIntent;
-   onGetInitialHeader()LHeader;
-   onGetNewHeader()LHeader;
-   onHeaderClick(LHeader;I)V
-   onIsHidingHeaders()Z
-   onIsMultiPane()Z
-   setListFooter(LView;)V
-   setParentTitle(LCharSequence;LCharSequence;LOnClickListener;)V
-   showBreadCrumbs(LCharSequence;LCharSequence;)V
-   startPreferenceFragment(LFragment;Z)V
-   startPreferencePanel(LString;LBundle;ILCharSequence;LFragment;I)V
-   startWithFragment(LString;LBundle;LFragment;I)V
-   startWithFragment(LString;LBundle;LFragment;III)V
-   switchToHeader(LHeader;)V
-   switchToHeader(LString;LBundle;)V
```


```diff
-android/preference/PreferenceActivity$Header
-   CREATOR
-   breadCrumbShortTitle
-   breadCrumbShortTitleRes
-   breadCrumbTitle
-   breadCrumbTitleRes
-   extras
-   fragment
-   fragmentArguments
-   iconRes
-   id
-   intent
-   summary
-   summaryRes
-   title
-   titleRes
-   <init>()V
-   getBreadCrumbShortTitle(LResources;)LCharSequence;
-   getBreadCrumbTitle(LResources;)LCharSequence;
-   getSummary(LResources;)LCharSequence;
-   getTitle(LResources;)LCharSequence;
-   readFromParcel(LParcel;)V
```


```diff
-android/preference/PreferenceCategory
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
```


```diff
-android/preference/PreferenceDataStore
-   getBoolean(LString;Z)Z
-   getFloat(LString;F)F
-   getInt(LString;I)I
-   getLong(LString;J)J
-   getString(LString;LString;)LString;
-   getStringSet(LString;LSet;)LSet;
-   putBoolean(LString;Z)V
-   putFloat(LString;F)V
-   putInt(LString;I)V
-   putLong(LString;J)V
-   putString(LString;LString;)V
-   putStringSet(LString;LSet;)V
```


```diff
android/preference/PreferenceFragment
-   <init>()V
-   addPreferencesFromIntent(LIntent;)V
-   addPreferencesFromResource(I)V
-   findPreference(LCharSequence;)LPreference;
-   getPreferenceManager()LPreferenceManager;
-   getPreferenceScreen()LPreferenceScreen;
-   onPreferenceTreeClick(LPreferenceScreen;LPreference;)Z
-   setPreferenceScreen(LPreferenceScreen;)V
```


```diff
android/preference/PreferenceFragment$OnPreferenceStartFragmentCallback
-   onPreferenceStartFragment(LPreferenceFragment;LPreference;)Z
```


```diff
-android/preference/PreferenceGroup
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   addItemFromInflater(LPreference;)V
-   addPreference(LPreference;)Z
-   dispatchRestoreInstanceState(LBundle;)V
-   dispatchSaveInstanceState(LBundle;)V
-   findPreference(LCharSequence;)LPreference;
-   getPreference(I)LPreference;
-   getPreferenceCount()I
-   isOnSameScreenAsChildren()Z
-   isOrderingAsAdded()Z
-   onPrepareAddPreference(LPreference;)Z
-   removeAll()V
-   removePreference(LPreference;)Z
-   setOrderingAsAdded(Z)V
```


```diff
-android/preference/PreferenceManager
-   KEY_HAS_SET_DEFAULT_VALUES
-   METADATA_KEY_PREFERENCES
-   createPreferenceScreen(LContext;)LPreferenceScreen;
-   findPreference(LCharSequence;)LPreference;
-   getDefaultSharedPreferences(LContext;)LSharedPreferences;
-   getDefaultSharedPreferencesName(LContext;)LString;
-   getPreferenceDataStore()LPreferenceDataStore;
-   getSharedPreferences()LSharedPreferences;
-   getSharedPreferencesMode()I
-   getSharedPreferencesName()LString;
-   isStorageDefault()Z
-   isStorageDeviceProtected()Z
-   setDefaultValues(LContext;IZ)V
-   setDefaultValues(LContext;LString;IIZ)V
-   setPreferenceDataStore(LPreferenceDataStore;)V
-   setSharedPreferencesMode(I)V
-   setSharedPreferencesName(LString;)V
-   setStorageDefault()V
-   setStorageDeviceProtected()V
```


```diff
-android/preference/PreferenceManager$OnActivityDestroyListener
-   onActivityDestroy()V
```


```diff
-android/preference/PreferenceManager$OnActivityResultListener
-   onActivityResult(IILIntent;)Z
```


```diff
-android/preference/PreferenceManager$OnActivityStopListener
-   onActivityStop()V
```


```diff
-android/preference/PreferenceScreen
-   bind(LListView;)V
-   getDialog()LDialog;
-   getRootAdapter()LListAdapter;
-   onCreateRootAdapter()LListAdapter;
```


```diff
-android/preference/RingtonePreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   getRingtoneType()I
-   getShowDefault()Z
-   getShowSilent()Z
-   onPrepareRingtonePickerIntent(LIntent;)V
-   onRestoreRingtone()LUri;
-   onSaveRingtone(LUri;)V
-   setRingtoneType(I)V
-   setShowDefault(Z)V
-   setShowSilent(Z)V
```


```diff
-android/preference/SwitchPreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   getSwitchTextOff()LCharSequence;
-   getSwitchTextOn()LCharSequence;
-   setSwitchTextOff(I)V
-   setSwitchTextOff(LCharSequence;)V
-   setSwitchTextOn(I)V
-   setSwitchTextOn(LCharSequence;)V
```


```diff
-android/preference/TwoStatePreference
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   getDisableDependentsState()Z
-   getSummaryOff()LCharSequence;
-   getSummaryOn()LCharSequence;
-   isChecked()Z
-   setChecked(Z)V
-   setDisableDependentsState(Z)V
-   setSummaryOff(I)V
-   setSummaryOff(LCharSequence;)V
-   setSummaryOn(I)V
-   setSummaryOn(LCharSequence;)V
```


```diff
android/provider/CalendarContract
+   ACTION_VIEW_MANAGED_PROFILE_CALENDAR_EVENT
+   EXTRA_EVENT_ID
+   startViewCalendarEventInManagedProfile(LContext;JJJZI)Z
```


```diff
android/provider/CalendarContract$Calendars
+   ENTERPRISE_CONTENT_URI
```


```diff
android/provider/CalendarContract$Events
+   ENTERPRISE_CONTENT_URI
```


```diff
android/provider/CalendarContract$Instances
+   ENTERPRISE_CONTENT_BY_DAY_URI
+   ENTERPRISE_CONTENT_SEARCH_BY_DAY_URI
+   ENTERPRISE_CONTENT_SEARCH_URI
+   ENTERPRISE_CONTENT_URI
```


```diff
android/provider/CallLog$Calls
+   BLOCK_REASON
+   BLOCK_REASON_BLOCKED_NUMBER
+   BLOCK_REASON_CALL_SCREENING_SERVICE
+   BLOCK_REASON_DIRECT_TO_VOICEMAIL
+   BLOCK_REASON_NOT_BLOCKED
+   BLOCK_REASON_NOT_IN_CONTACTS
+   BLOCK_REASON_PAY_PHONE
+   BLOCK_REASON_RESTRICTED_NUMBER
+   BLOCK_REASON_UNKNOWN_NUMBER
+   CALL_SCREENING_APP_NAME
+   CALL_SCREENING_COMPONENT_NAME
```


```diff
android/provider/Contacts$PresenceColumns
-   AVAILABLE
-   AWAY
-   DO_NOT_DISTURB
-   IDLE
-   INVISIBLE
-   OFFLINE
-   PRESENCE_CUSTOM_STATUS
-   PRESENCE_STATUS
-   PRIORITY
```


```diff
android/provider/ContactsContract$ContactOptionsColumns
-   LAST_TIME_CONTACTED
-   TIMES_CONTACTED
```


```diff
android/provider/ContactsContract$Contacts
-   CONTENT_FREQUENT_URI
```


```diff
-android/provider/ContactsContract$DataUsageFeedback
-   DELETE_USAGE_URI
-   FEEDBACK_URI
-   USAGE_TYPE
-   USAGE_TYPE_CALL
-   USAGE_TYPE_LONG_TEXT
-   USAGE_TYPE_SHORT_TEXT
-   <init>()V
```


```diff
android/provider/ContactsContract$DataUsageStatColumns
-   LAST_TIME_USED
-   TIMES_USED
```


```diff
android/provider/ContactsContract$Presence
-   <init>()V
```


```diff
android/provider/DocumentsContract
+   METADATA_EXIF
+   METADATA_TREE_COUNT
+   METADATA_TREE_SIZE
+   METADATA_TYPES
+   QUERY_ARG_DISPLAY_NAME
+   QUERY_ARG_EXCLUDE_MEDIA
+   QUERY_ARG_FILE_SIZE_OVER
+   QUERY_ARG_LAST_MODIFIED_AFTER
+   QUERY_ARG_MIME_TYPES
+   getDocumentMetadata(LContentResolver;LUri;)LBundle;
+   isChildDocument(LContentResolver;LUri;LUri;)Z
+   isRootUri(LContext;LUri;)Z
+   isRootsUri(LContext;LUri;)Z
```


```diff
android/provider/DocumentsContract$Document
+   FLAG_PARTIAL
+   FLAG_SUPPORTS_METADATA
```


```diff
android/provider/DocumentsContract$Root
+   COLUMN_QUERY_ARGS
+   FLAG_EMPTY
```


```diff
android/provider/DocumentsProvider
+   getDocumentMetadata(LString;)LBundle;
+   queryRecentDocuments(LString;[LString;LBundle;LCancellationSignal;)LCursor;
+   querySearchDocuments(LString;[LString;LBundle;)LCursor;
```


```diff
android/provider/LiveFolders
-   ACTION_CREATE_LIVE_FOLDER
-   DESCRIPTION
-   DISPLAY_MODE_GRID
-   DISPLAY_MODE_LIST
-   EXTRA_LIVE_FOLDER_BASE_INTENT
-   EXTRA_LIVE_FOLDER_DISPLAY_MODE
-   EXTRA_LIVE_FOLDER_ICON
-   EXTRA_LIVE_FOLDER_NAME
-   ICON_BITMAP
-   ICON_PACKAGE
-   ICON_RESOURCE
-   INTENT
-   NAME
```


```diff
android/provider/MediaStore
+   ACTION_REVIEW
+   ACTION_REVIEW_SECURE
+   AUTHORITY_URI
+   EXTRA_BRIGHTNESS
+   VOLUME_EXTERNAL
+   VOLUME_EXTERNAL_PRIMARY
+   VOLUME_INTERNAL
+   getExternalVolumeNames(LContext;)LSet;
+   getMediaUri(LContext;LUri;)LUri;
+   getVersion(LContext;LString;)LString;
+   getVolumeName(LUri;)LString;
+   setIncludePending(LUri;)LUri;
+   setRequireOriginal(LUri;)LUri;
```


```diff
android/provider/MediaStore$Audio$AlbumColumns
-   ALBUM_ART
+   ARTIST_ID
```


```diff
android/provider/MediaStore$Audio$AudioColumns
+   IS_AUDIOBOOK
```


```diff
android/provider/MediaStore$Audio$Media
-   getContentUriForPath(LString;)LUri;
```


```diff
android/provider/MediaStore$Audio$PlaylistsColumns
-   DATA
```


```diff
+android/provider/MediaStore$DownloadColumns
```


```diff
+android/provider/MediaStore$Downloads
```


```diff
android/provider/MediaStore$Images$ImageColumns
-   LATITUDE
-   LONGITUDE
-   MINI_THUMB_MAGIC
-   PICASA_ID
```


```diff
android/provider/MediaStore$Images$Media
-   getBitmap(LContentResolver;LUri;)LBitmap;
-   insertImage(LContentResolver;LBitmap;LString;LString;)LString;
-   insertImage(LContentResolver;LString;LString;LString;)LString;
-   query(LContentResolver;LUri;[LString;)LCursor;
-   query(LContentResolver;LUri;[LString;LString;LString;)LCursor;
-   query(LContentResolver;LUri;[LString;LString;[LString;LString;)LCursor;
```


```diff
-android/provider/MediaStore$Images$Thumbnails
-   DATA
-   DEFAULT_SORT_ORDER
-   EXTERNAL_CONTENT_URI
-   FULL_SCREEN_KIND
-   HEIGHT
-   IMAGE_ID
-   INTERNAL_CONTENT_URI
-   KIND
-   MICRO_KIND
-   MINI_KIND
-   THUMB_DATA
-   WIDTH
-   <init>()V
-   cancelThumbnailRequest(LContentResolver;J)V
-   cancelThumbnailRequest(LContentResolver;JJ)V
-   getContentUri(LString;)LUri;
-   getThumbnail(LContentResolver;JILOptions;)LBitmap;
-   getThumbnail(LContentResolver;JJILOptions;)LBitmap;
-   query(LContentResolver;LUri;[LString;)LCursor;
-   queryMiniThumbnail(LContentResolver;JI[LString;)LCursor;
-   queryMiniThumbnails(LContentResolver;LUri;I[LString;)LCursor;
```


```diff
android/provider/MediaStore$MediaColumns
+   BUCKET_DISPLAY_NAME
+   BUCKET_ID
-   DATA
+   DATE_EXPIRES
+   DATE_TAKEN
+   DOCUMENT_ID
+   DURATION
+   INSTANCE_ID
+   IS_PENDING
+   ORIENTATION
+   ORIGINAL_DOCUMENT_ID
+   OWNER_PACKAGE_NAME
+   RELATIVE_PATH
+   VOLUME_NAME
```


```diff
android/provider/MediaStore$Video
-   query(LContentResolver;LUri;[LString;)LCursor;
```


```diff
-android/provider/MediaStore$Video$Thumbnails
-   DATA
-   DEFAULT_SORT_ORDER
-   EXTERNAL_CONTENT_URI
-   FULL_SCREEN_KIND
-   HEIGHT
-   INTERNAL_CONTENT_URI
-   KIND
-   MICRO_KIND
-   MINI_KIND
-   VIDEO_ID
-   WIDTH
-   <init>()V
-   cancelThumbnailRequest(LContentResolver;J)V
-   cancelThumbnailRequest(LContentResolver;JJ)V
-   getContentUri(LString;)LUri;
-   getThumbnail(LContentResolver;JILOptions;)LBitmap;
-   getThumbnail(LContentResolver;JJILOptions;)LBitmap;
```


```diff
android/provider/MediaStore$Video$VideoColumns
-   LATITUDE
-   LONGITUDE
-   MINI_THUMB_MAGIC
```


```diff
android/provider/Settings
+   ACTION_APP_NOTIFICATION_BUBBLE_SETTINGS
+   ACTION_APP_SEARCH_SETTINGS
+   ACTION_APP_USAGE_SETTINGS
+   ACTION_NOTIFICATION_ASSISTANT_SETTINGS
+   ACTION_PROCESS_WIFI_EASY_CONNECT_URI
-   ACTION_STORAGE_VOLUME_ACCESS_SETTINGS
```


```diff
android/provider/Settings$Global
+   APPLY_RAMPING_RINGER
```


```diff
+android/provider/Settings$Panel
```


```diff
android/provider/Telephony$CarrierId
+   SPECIFIC_CARRIER_ID
+   SPECIFIC_CARRIER_ID_NAME
+   getSpecificCarrierIdUriForSubscriptionId(I)LUri;
```


```diff
android/provider/Telephony$Carriers
+   CARRIER_ID
-   MCC
-   MNC
-   MVNO_MATCH_DATA
-   MVNO_TYPE
-   NUMERIC
+   SIM_APN_URI
```


```diff
android/provider/Telephony$Mms$Part
+   CONTENT_URI
```


```diff
android/provider/Telephony$Sms$Intents
-   SECRET_CODE_ACTION
```


```diff
android/renderscript/ScriptGroup$Builder
-   <init>(LRenderScript;)V
-   addConnection(LType;LKernelID;LFieldID;)LBuilder;
-   addConnection(LType;LKernelID;LKernelID;)LBuilder;
-   addKernel(LKernelID;)LBuilder;
-   create()LScriptGroup;
```


```diff
android/renderscript/Type$CubemapFace
-   POSITVE_X
-   POSITVE_Y
-   POSITVE_Z
```


```diff
android/security/KeyPairGeneratorSpec
-   getAlgorithmParameterSpec()LAlgorithmParameterSpec;
-   getContext()LContext;
-   getEndDate()LDate;
-   getKeySize()I
-   getKeyType()LString;
-   getKeystoreAlias()LString;
-   getSerialNumber()LBigInteger;
-   getStartDate()LDate;
-   getSubjectDN()LX500Principal;
-   isEncryptionRequired()Z
```


```diff
android/security/KeyPairGeneratorSpec$Builder
-   <init>(LContext;)V
-   build()LKeyPairGeneratorSpec;
-   setAlgorithmParameterSpec(LAlgorithmParameterSpec;)LBuilder;
-   setAlias(LString;)LBuilder;
-   setEncryptionRequired()LBuilder;
-   setEndDate(LDate;)LBuilder;
-   setKeySize(I)LBuilder;
-   setKeyType(LString;)LBuilder;
-   setSerialNumber(LBigInteger;)LBuilder;
-   setStartDate(LDate;)LBuilder;
-   setSubject(LX500Principal;)LBuilder;
```


```diff
android/security/KeyStoreParameter
-   isEncryptionRequired()Z
```


```diff
android/security/KeyStoreParameter$Builder
-   <init>(LContext;)V
-   build()LKeyStoreParameter;
-   setEncryptionRequired(Z)LBuilder;
```


```diff
android/service/autofill/CustomDescription$Builder
+   addOnClickAction(ILOnClickAction;)LBuilder;
```


```diff
android/service/autofill/FillContext
+   getFocusedId()LAutofillId;
```


```diff
android/service/autofill/FillRequest
+   FLAG_COMPATIBILITY_MODE_REQUEST
```


```diff
android/service/autofill/FillResponse$Builder
+   setUserData(LUserData;)LBuilder;
```


```diff
+android/service/autofill/OnClickAction
```


```diff
android/service/autofill/SaveInfo
+   FLAG_DELAY_SAVE
```


```diff
android/service/autofill/UserData
+   getFieldClassificationAlgorithmForCategory(LString;)LString;
```


```diff
android/service/autofill/UserData$Builder
+   setFieldClassificationAlgorithmForCategory(LString;LString;LBundle;)LBuilder;
```


```diff
+android/service/autofill/VisibilitySetterAction
```


```diff
+android/service/autofill/VisibilitySetterAction$Builder
```


```diff
android/service/carrier/CarrierIdentifier
+   <init>(LString;LString;LString;LString;LString;LString;II)V
+   getCarrierId()I
+   getSpecificCarrierId()I
```


```diff
+android/service/carrier/CarrierMessagingClientService
```


```diff
-android/service/notification/ConditionProviderService
-   EXTRA_RULE_ID
-   META_DATA_CONFIGURATION_ACTIVITY
-   META_DATA_RULE_INSTANCE_LIMIT
-   META_DATA_RULE_TYPE
-   SERVICE_INTERFACE
-   <init>()V
-   notifyCondition(LCondition;)V
-   notifyConditions([LCondition;)V
-   onConnected()V
-   onRequestConditions(I)V
-   onSubscribe(LUri;)V
-   onUnsubscribe(LUri;)V
-   requestRebind(LComponentName;)V
-   requestUnbind()V
```


```diff
android/service/notification/NotificationListenerService
+   clearRequestedListenerHints()V
+   onSilentStatusBarIconsVisibilityChanged(Z)V
```


```diff
android/service/notification/NotificationListenerService$Ranking
+   canBubble()Z
+   getLastAudiblyAlertedMillis()J
+   getSmartActions()LList;
+   getSmartReplies()LList;
```


```diff
android/service/notification/StatusBarNotification
+   getOpPkg()LString;
+   getUid()I
```


```diff
+android/service/notification/ZenPolicy
```


```diff
+android/service/notification/ZenPolicy$Builder
```


```diff
android/service/quicksettings/Tile
+   getSubtitle()LCharSequence;
+   setSubtitle(LCharSequence;)V
```


```diff
android/service/voice/VoiceInteractionService
+   onGetSupportedVoiceActions(LSet;)LSet;
+   setUiHints(LBundle;)V
```


```diff
android/service/voice/VoiceInteractionSession
+   SHOW_SOURCE_AUTOMOTIVE_SYSTEM_UI
+   SHOW_SOURCE_NOTIFICATION
+   SHOW_SOURCE_PUSH_TO_TALK
+   onDirectActionsInvalidated(LActivityId;)V
+   onHandleAssist(LAssistState;)V
-   onHandleAssist(LBundle;LAssistStructure;LAssistContent;)V
-   onHandleAssistSecondary(LBundle;LAssistStructure;LAssistContent;II)V
+   performDirectAction(LDirectAction;LBundle;LCancellationSignal;LExecutor;LConsumer;)V
+   requestDirectActions(LActivityId;LCancellationSignal;LExecutor;LConsumer;)V
```


```diff
+android/service/voice/VoiceInteractionSession$ActivityId
```


```diff
+android/service/voice/VoiceInteractionSession$AssistState
```


```diff
android/service/wallpaper/WallpaperService$Engine
+   getDisplayContext()LContext;
```


```diff
android/speech/tts/TextToSpeech$OnUtteranceCompletedListener
-   onUtteranceCompleted(LString;)V
```


```diff
android/system/Os
+   bind(LFileDescriptor;LSocketAddress;)V
+   connect(LFileDescriptor;LSocketAddress;)V
+   getsockoptTimeval(LFileDescriptor;II)LStructTimeval;
+   sendto(LFileDescriptor;[BIIILSocketAddress;)I
-   setegid(I)V
-   seteuid(I)V
-   setgid(I)V
+   setsockoptTimeval(LFileDescriptor;IILStructTimeval;)V
-   setuid(I)V
```


```diff
android/system/OsConstants
+   AF_NETLINK
+   AF_PACKET
+   ARPHRD_ETHER
+   ETH_P_ALL
+   ETH_P_ARP
+   ETH_P_IP
+   ETH_P_IPV6
+   ICMP6_ECHO_REPLY
+   ICMP6_ECHO_REQUEST
+   ICMP_ECHO
+   ICMP_ECHOREPLY
+   NETLINK_INET_DIAG
+   NETLINK_ROUTE
+   RTMGRP_NEIGH
+   SOCK_CLOEXEC
+   SOCK_NONBLOCK
```


```diff
+android/system/StructTimeval
```


```diff
android/telecom/Call
-   AVAILABLE_PHONE_ACCOUNTS
+   EXTRA_SILENT_RINGING_REQUESTED
+   EXTRA_SUGGESTED_PHONE_ACCOUNTS
```


```diff
android/telecom/Call$Details
+   DIRECTION_INCOMING
+   DIRECTION_OUTGOING
+   DIRECTION_UNKNOWN
+   PROPERTY_NETWORK_IDENTIFIED_EMERGENCY_CALL
+   PROPERTY_VOIP_AUDIO_MODE
+   getCallDirection()I
```


```diff
+android/telecom/CallRedirectionService
```


```diff
android/telecom/CallScreeningService$CallResponse
+   getSilenceCall()Z
```


```diff
android/telecom/CallScreeningService$CallResponse$Builder
+   setSilenceCall(Z)Landroid/telecom/CallScreeningService$CallResponse$Builder;
```


```diff
android/telecom/Connection
-   CAPABILITY_CAN_UPGRADE_TO_VIDEO
+   EVENT_RTT_AUDIO_INDICATION_CHANGED
+   EXTRA_IS_RTT_AUDIO_PRESENT
+   EXTRA_SIP_INVITE
+   onSilence()V
```


```diff
+android/telecom/PhoneAccountSuggestion
```


```diff
android/telecom/TelecomManager
+   ACTION_DEFAULT_CALL_SCREENING_APP_CHANGED
+   EXTRA_CALL_NETWORK_TYPE
+   EXTRA_DEFAULT_CALL_SCREENING_APP_COMPONENT_NAME
+   EXTRA_IS_DEFAULT_CALL_SCREENING_APP
+   METADATA_IN_CALL_SERVICE_CAR_MODE_UI
-   acceptRingingCall()V
-   acceptRingingCall(I)V
-   endCall()Z
+   getSystemDialerPackage()LString;
+   getUserSelectedOutgoingPhoneAccount()LPhoneAccountHandle;
```


```diff
android/telecom/VideoProfile$CameraCapabilities
+   <init>(IIZF)V
+   getMaxZoom()F
+   isZoomSupported()Z
```


```diff
+android/telephony/AvailableNetworkInfo
```


```diff
android/telephony/CarrierConfigManager
+   KEY_CALL_BARRING_SUPPORTS_DEACTIVATE_ALL_BOOL
+   KEY_CALL_BARRING_SUPPORTS_PASSWORD_CHANGE_BOOL
+   KEY_CALL_BARRING_VISIBILITY_BOOL
+   KEY_CARRIER_CALL_SCREENING_APP_STRING
+   KEY_CARRIER_CONFIG_VERSION_STRING
+   KEY_CARRIER_DEFAULT_WFC_IMS_MODE_INT
+   KEY_CARRIER_DEFAULT_WFC_IMS_ROAMING_MODE_INT
+   KEY_CARRIER_SUPPORTS_SS_OVER_UT_BOOL
+   KEY_CARRIER_UT_PROVISIONING_REQUIRED_BOOL
+   KEY_EMERGENCY_NUMBER_PREFIX_STRING_ARRAY
+   KEY_ENHANCED_4G_LTE_ON_BY_DEFAULT_BOOL
+   KEY_HIDE_PRESET_APN_DETAILS_BOOL
+   KEY_OPPORTUNISTIC_NETWORK_DATA_SWITCH_HYSTERESIS_TIME_LONG
+   KEY_OPPORTUNISTIC_NETWORK_ENTRY_OR_EXIT_HYSTERESIS_TIME_LONG
+   KEY_OPPORTUNISTIC_NETWORK_ENTRY_THRESHOLD_BANDWIDTH_INT
+   KEY_OPPORTUNISTIC_NETWORK_ENTRY_THRESHOLD_RSRP_INT
+   KEY_OPPORTUNISTIC_NETWORK_ENTRY_THRESHOLD_RSSNR_INT
+   KEY_OPPORTUNISTIC_NETWORK_EXIT_THRESHOLD_RSRP_INT
+   KEY_OPPORTUNISTIC_NETWORK_EXIT_THRESHOLD_RSSNR_INT
+   KEY_RADIO_RESTART_FAILURE_CAUSES_INT_ARRAY
-   KEY_RESTART_RADIO_ON_PDP_FAIL_REGULAR_DEACTIVATION_BOOL
+   KEY_SHOW_CALL_BLOCKING_DISABLED_NOTIFICATION_ALWAYS_BOOL
+   KEY_SUPPORT_CLIR_NETWORK_DEFAULT_BOOL
+   KEY_SUPPORT_EMERGENCY_SMS_OVER_IMS_BOOL
+   KEY_TTY_SUPPORTED_BOOL
```


```diff
+android/telephony/CellIdentityNr
```


```diff
android/telephony/CellIdentityTdscdma
+   getMobileNetworkOperator()LString;
+   getUarfcn()I
```


```diff
android/telephony/CellInfo
+   UNAVAILABLE
+   UNAVAILABLE_LONG
```


```diff
+android/telephony/CellInfoNr
```


```diff
+android/telephony/CellInfoTdscdma
```


```diff
android/telephony/CellSignalStrengthGsm
+   getBitErrorRate()I
```


```diff
android/telephony/CellSignalStrengthLte
+   getRssi()I
```


```diff
+android/telephony/CellSignalStrengthNr
```


```diff
+android/telephony/CellSignalStrengthTdscdma
```


```diff
+android/telephony/MbmsGroupCallSession
```


```diff
-android/telephony/NeighboringCellInfo
-   CREATOR
-   UNKNOWN_CID
-   UNKNOWN_RSSI
-   <init>(ILString;I)V
-   <init>(LParcel;)V
-   getCid()I
-   getLac()I
-   getNetworkType()I
-   getPsc()I
-   getRssi()I
```


```diff
android/telephony/PhoneNumberUtils
-   isEmergencyNumber(LString;)Z
-   isLocalEmergencyNumber(LContext;LString;)Z
```


```diff
android/telephony/PhoneStateListener
+   LISTEN_ACTIVE_DATA_SUBSCRIPTION_ID_CHANGE
+   LISTEN_EMERGENCY_NUMBER_LIST
+   <init>(LExecutor;)V
+   onActiveDataSubscriptionIdChanged(I)V
```


```diff
android/telephony/ServiceState
-   <init>(LParcel;)V
```


```diff
android/telephony/SignalStrength
+   INVALID
-   getCdmaDbm()I
-   getCdmaEcio()I
+   getCellSignalStrengths()LList;
+   getCellSignalStrengths(LClass;)LList;
-   getEvdoDbm()I
-   getEvdoEcio()I
-   getEvdoSnr()I
-   getGsmBitErrorRate()I
-   getGsmSignalStrength()I
-   isGsm()Z
```


```diff
android/telephony/SmsManager
+   createAppSpecificSmsTokenWithPackageInfo(LString;LPendingIntent;)LString;
+   getSmsMessagesForFinancialApp(LBundle;LExecutor;LFinancialSmsCallback;)V
```


```diff
+android/telephony/SmsManager$FinancialSmsCallback
```


```diff
android/telephony/SubscriptionInfo
+   getCardId()I
+   getCarrierId()I
+   getGroupUuid()LParcelUuid;
-   getMcc()I
+   getMccString()LString;
-   getMnc()I
+   getMncString()LString;
+   getSubscriptionType()I
+   isOpportunistic()Z
```


```diff
android/telephony/SubscriptionManager
+   DEFAULT_SUBSCRIPTION_ID
+   INVALID_SIM_SLOT_INDEX
+   SUBSCRIPTION_TYPE_LOCAL_SIM
+   SUBSCRIPTION_TYPE_REMOTE_SIM
+   addOnOpportunisticSubscriptionsChangedListener(LExecutor;LOnOpportunisticSubscriptionsChangedListener;)V
+   addSubscriptionsIntoGroup(LList;LParcelUuid;)V
+   createSubscriptionGroup(LList;)LParcelUuid;
+   getOpportunisticSubscriptions()LList;
+   getSlotIndex(I)I
+   getSubscriptionIds(I)[I
+   getSubscriptionsInGroup(LParcelUuid;)LList;
+   isActiveSubscriptionId(I)Z
+   isUsableSubscriptionId(I)Z
+   isValidSubscriptionId(I)Z
+   removeOnOpportunisticSubscriptionsChangedListener(LOnOpportunisticSubscriptionsChangedListener;)V
+   removeSubscriptionsFromGroup(LList;LParcelUuid;)V
+   setOpportunistic(ZI)Z
+   switchToSubscription(ILPendingIntent;)V
```


```diff
+android/telephony/SubscriptionManager$OnOpportunisticSubscriptionsChangedListener
```


```diff
android/telephony/TelephonyManager
+   ACTION_CARRIER_MESSAGING_CLIENT_SERVICE
+   ACTION_NETWORK_COUNTRY_CHANGED
+   ACTION_SECRET_CODE
+   ACTION_SUBSCRIPTION_SPECIFIC_CARRIER_IDENTITY_CHANGED
+   DATA_UNKNOWN
-   EXTRA_INCOMING_NUMBER
+   EXTRA_NETWORK_COUNTRY
+   EXTRA_SPECIFIC_CARRIER_ID
+   EXTRA_SPECIFIC_CARRIER_NAME
+   MULTISIM_ALLOWED
+   MULTISIM_NOT_SUPPORTED_BY_CARRIER
+   MULTISIM_NOT_SUPPORTED_BY_HARDWARE
+   NETWORK_TYPE_NR
+   SET_OPPORTUNISTIC_SUB_INACTIVE_SUBSCRIPTION
+   SET_OPPORTUNISTIC_SUB_SUCCESS
+   SET_OPPORTUNISTIC_SUB_VALIDATION_FAILED
+   UNINITIALIZED_CARD_ID
+   UNSUPPORTED_CARD_ID
+   UPDATE_AVAILABLE_NETWORKS_ABORTED
+   UPDATE_AVAILABLE_NETWORKS_INVALID_ARGUMENTS
+   UPDATE_AVAILABLE_NETWORKS_NO_CARRIER_PRIVILEGE
+   UPDATE_AVAILABLE_NETWORKS_SUCCESS
+   UPDATE_AVAILABLE_NETWORKS_UNKNOWN_FAILURE
+   doesSwitchMultiSimConfigTriggerReboot()Z
+   getCardIdForDefaultEuicc()I
+   getCarrierIdFromSimMccMnc()I
+   getEmergencyNumberList()LMap;
+   getEmergencyNumberList(I)LMap;
+   getManufacturerCode()LString;
+   getManufacturerCode(I)LString;
+   getPreferredOpportunisticDataSubscription()I
+   getSimSpecificCarrierId()I
+   getSimSpecificCarrierIdName()LCharSequence;
+   getTypeAllocationCode()LString;
+   getTypeAllocationCode(I)LString;
+   getUiccCardsInfo()LList;
+   isDataRoamingEnabled()Z
+   isEmergencyNumber(LString;)Z
+   isMultiSimSupported()I
+   isRttSupported()Z
+   requestCellInfoUpdate(LExecutor;LCellInfoCallback;)V
+   setPreferredOpportunisticDataSubscription(IZLExecutor;LConsumer;)V
+   switchMultiSimConfig(I)V
+   updateAvailableNetworks(LList;LExecutor;LConsumer;)V
```


```diff
+android/telephony/TelephonyManager$CellInfoCallback
```


```diff
+android/telephony/UiccCardInfo
```


```diff
android/telephony/data/ApnSetting
+   PROTOCOL_NON_IP
+   PROTOCOL_UNSTRUCTURED
+   TYPE_MCX
+   getCarrierId()I
-   getMmsProxyAddress()LInetAddress;
+   getMmsProxyAddressAsString()LString;
-   getProxyAddress()LInetAddress;
+   getProxyAddressAsString()LString;
```


```diff
android/telephony/data/ApnSetting$Builder
+   setCarrierId(I)LBuilder;
-   setMmsProxyAddress(LInetAddress;)LBuilder;
+   setMmsProxyAddress(LString;)LBuilder;
-   setProxyAddress(LInetAddress;)LBuilder;
+   setProxyAddress(LString;)LBuilder;
```


```diff
+android/telephony/emergency/EmergencyNumber
```


```diff
android/telephony/euicc/EuiccManager
+   createForCardId(I)LEuiccManager;
+   updateSubscriptionNickname(ILString;LPendingIntent;)V
```


```diff
android/telephony/gsm/SmsMessage$MessageClass
-   CLASS_0
-   CLASS_1
-   CLASS_2
-   CLASS_3
-   UNKNOWN
```


```diff
+android/telephony/mbms/GroupCall
```


```diff
+android/telephony/mbms/GroupCallCallback
```


```diff
+android/telephony/mbms/MbmsErrors$GroupCallErrors
```


```diff
+android/telephony/mbms/MbmsGroupCallSessionCallback
```


```diff
android/text/AndroidCharacter
-   EAST_ASIAN_WIDTH_AMBIGUOUS
-   EAST_ASIAN_WIDTH_FULL_WIDTH
-   EAST_ASIAN_WIDTH_HALF_WIDTH
-   EAST_ASIAN_WIDTH_NARROW
-   EAST_ASIAN_WIDTH_NEUTRAL
-   EAST_ASIAN_WIDTH_WIDE
-   <init>()V
-   getDirectionalities([C[BI)V
-   getEastAsianWidth(C)I
-   getEastAsianWidths([CII[B)V
-   getMirror(C)C
-   mirror([CII)Z
```


```diff
android/text/ClipboardManager
-   <init>()V
-   getText()LCharSequence;
-   hasText()Z
-   setText(LCharSequence;)V
```


```diff
android/text/PrecomputedText$Params$Builder
+   <init>(LParams;)V
```


```diff
android/text/TextPaint
+   underlineColor
+   underlineThickness
```


```diff
android/text/TextUtils
+   SAFE_STRING_FLAG_FIRST_LINE
+   SAFE_STRING_FLAG_SINGLE_LINE
+   SAFE_STRING_FLAG_TRIM
+   makeSafeForPresentation(LString;IFI)LCharSequence;
```


```diff
android/text/format/Time
-   EPOCH_JULIAN_DAY
-   FRIDAY
-   HOUR
-   MINUTE
-   MONDAY
-   MONDAY_BEFORE_JULIAN_EPOCH
-   MONTH
-   MONTH_DAY
-   SATURDAY
-   SECOND
-   SUNDAY
-   THURSDAY
-   TIMEZONE_UTC
-   TUESDAY
-   WEDNESDAY
-   WEEK_DAY
-   WEEK_NUM
-   YEAR
-   YEAR_DAY
-   allDay
-   gmtoff
-   hour
-   isDst
-   minute
-   month
-   monthDay
-   second
-   timezone
-   weekDay
-   year
-   yearDay
-   <init>()V
-   <init>(LString;)V
-   <init>(LTime;)V
-   after(LTime;)Z
-   before(LTime;)Z
-   clear(LString;)V
-   compare(LTime;LTime;)I
-   format(LString;)LString;
-   format2445()LString;
-   format3339(Z)LString;
-   getActualMaximum(I)I
-   getCurrentTimezone()LString;
-   getJulianDay(JJ)I
-   getJulianMondayFromWeeksSinceEpoch(I)I
-   getWeekNumber()I
-   getWeeksSinceEpochFromJulianDay(II)I
-   isEpoch(LTime;)Z
-   normalize(Z)J
-   parse(LString;)Z
-   parse3339(LString;)Z
-   set(III)V
-   set(IIIIII)V
-   set(J)V
-   set(LTime;)V
-   setJulianDay(I)J
-   setToNow()V
-   switchTimezone(LString;)V
-   toMillis(Z)J
```


```diff
android/text/style/DynamicDrawableSpan
+   ALIGN_CENTER
```


```diff
+android/text/style/LineBackgroundSpan$Standard
```


```diff
+android/text/style/LineHeightSpan$Standard
```


```diff
android/text/style/SuggestionSpan
-   ACTION_SUGGESTION_PICKED
-   SUGGESTION_SPAN_PICKED_AFTER
-   SUGGESTION_SPAN_PICKED_BEFORE
-   SUGGESTION_SPAN_PICKED_HASHCODE
+   getUnderlineColor()I
```


```diff
android/text/style/TextAppearanceSpan
+   getFontFeatureSettings()LString;
+   getFontVariationSettings()LString;
+   getShadowColor()I
+   getShadowDx()F
+   getShadowDy()F
+   getShadowRadius()F
+   getTextFontWeight()I
+   getTextLocales()LLocaleList;
+   getTypeface()LTypeface;
+   isElegantTextHeight()Z
```


```diff
android/text/util/Linkify
+   addLinks(LSpannable;ILFunction;)Z
+   addLinks(LSpannable;LPattern;LString;[LString;LMatchFilter;LTransformFilter;LFunction;)Z
```


```diff
android/transition/Scene
+   getCurrentScene(LViewGroup;)LScene;
```


```diff
android/transition/TransitionValues
-   <init>()V
+   <init>(LView;)V
```


```diff
android/util/ArrayMap
+   indexOfValue(LObject;)I
```


```diff
android/util/ArraySet
+   <init>(LCollection;)V
```


```diff
android/util/DisplayMetrics
+   DENSITY_140
+   DENSITY_180
+   DENSITY_200
+   DENSITY_220
+   DENSITY_450
+   DENSITY_600
```


```diff
android/util/EventLogTags
-   <init>()V
-   <init>(LBufferedReader;)V
-   get(I)LDescription;
-   get(LString;)LDescription;
```


```diff
-android/util/EventLogTags$Description
-   mName
-   mTag
```


```diff
android/util/MutableBoolean
-   value
-   <init>(Z)V
```


```diff
android/util/MutableByte
-   value
-   <init>(B)V
```


```diff
android/util/MutableChar
-   value
-   <init>(C)V
```


```diff
android/util/MutableDouble
-   value
-   <init>(D)V
```


```diff
android/util/MutableFloat
-   value
-   <init>(F)V
```


```diff
android/util/MutableInt
-   value
-   <init>(I)V
```


```diff
android/util/MutableLong
-   value
-   <init>(J)V
```


```diff
android/util/MutableShort
-   value
-   <init>(S)V
```


```diff
android/util/SparseBooleanArray
+   setValueAt(IZ)V
```


```diff
android/util/SparseIntArray
+   setValueAt(II)V
```


```diff
android/util/StatsLog
+   logBinaryPushStateChanged(LString;JII[J)Z
```


```diff
android/util/TimeUtils
+   getTimeZoneIdsForCountryCode(LString;)LList;
```


```diff
android/util/TypedValue
+   sourceResourceId
+   isColorType()Z
```


```diff
android/view/ContextThemeWrapper
+   setTheme(LTheme;)V
```


```diff
android/view/Display
+   getCutout()LDisplayCutout;
+   getPreferredWideGamutColorSpace()LColorSpace;
```


```diff
android/view/Display$HdrCapabilities
+   HDR_TYPE_HDR10_PLUS
```


```diff
android/view/DisplayCutout
+   <init>(LInsets;LRect;LRect;LRect;LRect;)V
-   <init>(LRect;LList;)V
+   getBoundingRectBottom()LRect;
+   getBoundingRectLeft()LRect;
+   getBoundingRectRight()LRect;
+   getBoundingRectTop()LRect;
```


```diff
android/view/InputDevice
+   isExternal()Z
```


```diff
android/view/KeyCharacterMap$KeyData
-   META_LENGTH
-   displayLabel
-   meta
-   number
-   <init>()V
```


```diff
android/view/KeyEvent
-   ACTION_MULTIPLE
+   KEYCODE_PROFILE_SWITCH
+   KEYCODE_THUMBS_DOWN
+   KEYCODE_THUMBS_UP
-   getCharacters()LString;
```


```diff
android/view/LayoutInflater
+   createView(LContext;LString;LString;LAttributeSet;)LView;
+   onCreateView(LContext;LView;LString;LAttributeSet;)LView;
```


```diff
android/view/MenuItem
+   getIconTintBlendMode()LBlendMode;
+   setIconTintBlendMode(LBlendMode;)LMenuItem;
```


```diff
android/view/MotionEvent
+   CLASSIFICATION_AMBIGUOUS_GESTURE
+   CLASSIFICATION_DEEP_PRESS
+   CLASSIFICATION_NONE
+   FLAG_WINDOW_IS_PARTIALLY_OBSCURED
+   getClassification()I
+   getRawX(I)F
+   getRawY(I)F
```


```diff
android/view/OrientationListener
-   ORIENTATION_UNKNOWN
-   <init>(LContext;)V
-   <init>(LContext;I)V
-   disable()V
-   enable()V
-   onOrientationChanged(I)V
```


```diff
android/view/Surface
+   <init>(LSurfaceControl;)V
```


```diff
+android/view/SurfaceControl
```


```diff
+android/view/SurfaceControl$Builder
```


```diff
+android/view/SurfaceControl$Transaction
```


```diff
android/view/SurfaceView
+   getSurfaceControl()LSurfaceControl;
```


```diff
android/view/TouchDelegate
+   getTouchDelegateInfo()LTouchDelegateInfo;
+   onTouchExplorationHoverEvent(LMotionEvent;)Z
```


```diff
android/view/View
+   getAccessibilityDelegate()LAccessibilityDelegate;
+   getAnimationMatrix()LMatrix;
+   getAttributeResolutionStack(I)[I
+   getAttributeSourceResourceMap()LMap;
+   getBackgroundTintBlendMode()LBlendMode;
+   getContentCaptureSession()LContentCaptureSession;
+   getExplicitStyle()I
+   getForegroundTintBlendMode()LBlendMode;
+   getHorizontalScrollbarThumbDrawable()LDrawable;
+   getHorizontalScrollbarTrackDrawable()LDrawable;
+   getLocationInSurface([I)V
+   getSourceLayoutResId()I
+   getSystemGestureExclusionRects()LList;
+   getTransitionAlpha()F
+   getUniqueDrawingId()J
+   getVerticalScrollbarThumbDrawable()LDrawable;
+   getVerticalScrollbarTrackDrawable()LDrawable;
+   isForceDarkAllowed()Z
+   saveAttributeDataForStyleable(LContext;[ILAttributeSet;LTypedArray;II)V
+   setAnimationMatrix(LMatrix;)V
+   setBackgroundTintBlendMode(LBlendMode;)V
+   setContentCaptureSession(LContentCaptureSession;)V
+   setForceDarkAllowed(Z)V
+   setForegroundTintBlendMode(LBlendMode;)V
+   setHorizontalScrollbarThumbDrawable(LDrawable;)V
+   setHorizontalScrollbarTrackDrawable(LDrawable;)V
+   setLeftTopRightBottom(IIII)V
+   setSystemGestureExclusionRects(LList;)V
+   setTransitionAlpha(F)V
+   setTransitionVisibility(I)V
+   setVerticalScrollbarThumbDrawable(LDrawable;)V
+   setVerticalScrollbarTrackDrawable(LDrawable;)V
+   transformMatrixToGlobal(LMatrix;)V
+   transformMatrixToLocal(LMatrix;)V
```


```diff
android/view/ViewConfiguration
+   getAmbiguousGestureMultiplier()F
+   getScaledMinimumScalingSpan()I
```


```diff
android/view/ViewDebug$HierarchyTraceType
-   BUILD_CACHE
-   DRAW
-   INVALIDATE
-   INVALIDATE_CHILD
-   INVALIDATE_CHILD_IN_PARENT
-   ON_LAYOUT
-   ON_MEASURE
-   REQUEST_LAYOUT
```


```diff
android/view/ViewDebug$RecyclerTraceType
-   BIND_VIEW
-   MOVE_FROM_ACTIVE_TO_SCRAP_HEAP
-   MOVE_TO_SCRAP_HEAP
-   NEW_VIEW
-   RECYCLE_FROM_ACTIVE_HEAP
-   RECYCLE_FROM_SCRAP_HEAP
```


```diff
android/view/ViewGroup
+   getChildDrawingOrder(I)I
+   isLayoutSuppressed()Z
+   suppressLayout(Z)V
```


```diff
android/view/ViewTreeObserver
+   addOnSystemGestureExclusionRectsChangedListener(LConsumer;)V
+   registerFrameCommitCallback(LRunnable;)V
+   removeOnSystemGestureExclusionRectsChangedListener(LConsumer;)V
+   unregisterFrameCommitCallback(LRunnable;)Z
```


```diff
android/view/Window
+   getSystemGestureExclusionRects()LList;
+   isNavigationBarContrastEnforced()Z
+   isStatusBarContrastEnforced()Z
+   setNavigationBarContrastEnforced(Z)V
+   setStatusBarContrastEnforced(Z)V
+   setSystemGestureExclusionRects(LList;)V
```


```diff
android/view/WindowInsets
+   getMandatorySystemGestureInsets()LInsets;
+   getStableInsets()LInsets;
+   getSystemGestureInsets()LInsets;
+   getSystemWindowInsets()LInsets;
+   getTappableElementInsets()LInsets;
+   inset(IIII)LWindowInsets;
-   replaceSystemWindowInsets(IIII)LWindowInsets;
-   replaceSystemWindowInsets(LRect;)LWindowInsets;
```


```diff
+android/view/WindowInsets$Builder
```


```diff
android/view/accessibility/AccessibilityManager
+   FLAG_CONTENT_CONTROLS
+   FLAG_CONTENT_ICONS
+   FLAG_CONTENT_TEXT
+   getRecommendedTimeoutMillis(II)I
```


```diff
android/view/accessibility/AccessibilityNodeInfo
-   getBoundsInParent(LRect;)V
+   getTouchDelegateInfo()LTouchDelegateInfo;
+   isTextEntryKey()Z
-   setBoundsInParent(LRect;)V
+   setTextEntryKey(Z)V
+   setTouchDelegateInfo(LTouchDelegateInfo;)V
```


```diff
android/view/accessibility/AccessibilityNodeInfo$AccessibilityAction
+   ACTION_PAGE_DOWN
+   ACTION_PAGE_LEFT
+   ACTION_PAGE_RIGHT
+   ACTION_PAGE_UP
```


```diff
+android/view/accessibility/AccessibilityNodeInfo$TouchDelegateInfo
```


```diff
android/view/animation/Animation
-   getDetachWallpaper()Z
-   setDetachWallpaper(Z)V
```


```diff
+android/view/contentcapture/ContentCaptureCondition
```


```diff
+android/view/contentcapture/ContentCaptureContext
```


```diff
+android/view/contentcapture/ContentCaptureContext$Builder
```


```diff
+android/view/contentcapture/ContentCaptureManager
```


```diff
+android/view/contentcapture/ContentCaptureSession
```


```diff
+android/view/contentcapture/ContentCaptureSessionId
```


```diff
+android/view/contentcapture/DataRemovalRequest
```


```diff
+android/view/contentcapture/DataRemovalRequest$Builder
```


```diff
+android/view/contentcapture/DataRemovalRequest$LocusIdRequest
```


```diff
android/view/inputmethod/InputMethodManager
-   setAdditionalInputMethodSubtypes(LString;[LInputMethodSubtype;)V
-   setCurrentInputMethodSubtype(LInputMethodSubtype;)Z
-   viewClicked(LView;)V
```


```diff
+android/view/inspector/InspectionCompanion
```


```diff
+android/view/inspector/InspectionCompanion$UninitializedPropertyMapException
```


```diff
+android/view/inspector/InspectionCompanionProvider
```


```diff
+android/view/inspector/IntFlagMapping
```


```diff
+android/view/inspector/PropertyMapper
```


```diff
+android/view/inspector/PropertyMapper$PropertyConflictException
```


```diff
+android/view/inspector/PropertyReader
```


```diff
+android/view/inspector/PropertyReader$PropertyTypeMismatchException
```


```diff
+android/view/inspector/StaticInspectionCompanionProvider
```


```diff
+android/view/inspector/WindowInspector
```


```diff
+android/view/textclassifier/ConversationAction
```


```diff
+android/view/textclassifier/ConversationAction$Builder
```


```diff
+android/view/textclassifier/ConversationActions
```


```diff
+android/view/textclassifier/ConversationActions$Message
```


```diff
+android/view/textclassifier/ConversationActions$Message$Builder
```


```diff
+android/view/textclassifier/ConversationActions$Request
```


```diff
+android/view/textclassifier/ConversationActions$Request$Builder
```


```diff
android/view/textclassifier/TextClassification
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextClassification$Builder
+   setExtras(LBundle;)LBuilder;
```


```diff
android/view/textclassifier/TextClassification$Request
+   getCallingPackageName()LString;
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextClassification$Request$Builder
+   setExtras(LBundle;)Landroid/view/textclassifier/TextClassification$Request$Builder;
```


```diff
android/view/textclassifier/TextClassifier
+   EXTRA_FROM_TEXT_CLASSIFIER
+   WIDGET_TYPE_NOTIFICATION
+   detectLanguage(LRequest;)LTextLanguage;
+   onTextClassifierEvent(LTextClassifierEvent;)V
+   suggestConversationActions(LRequest;)LConversationActions;
```


```diff
android/view/textclassifier/TextClassifier$EntityConfig
-   create(LCollection;LCollection;LCollection;)LEntityConfig;
-   createWithExplicitEntityList(LCollection;)LEntityConfig;
-   createWithHints(LCollection;)LEntityConfig;
+   shouldIncludeTypesFromTextClassifier()Z
```


```diff
+android/view/textclassifier/TextClassifier$EntityConfig$Builder
```


```diff
+android/view/textclassifier/TextClassifierEvent
```


```diff
+android/view/textclassifier/TextClassifierEvent$Builder
```


```diff
+android/view/textclassifier/TextClassifierEvent$ConversationActionsEvent
```


```diff
+android/view/textclassifier/TextClassifierEvent$ConversationActionsEvent$Builder
```


```diff
+android/view/textclassifier/TextClassifierEvent$LanguageDetectionEvent
```


```diff
+android/view/textclassifier/TextClassifierEvent$LanguageDetectionEvent$Builder
```


```diff
+android/view/textclassifier/TextClassifierEvent$TextLinkifyEvent
```


```diff
+android/view/textclassifier/TextClassifierEvent$TextLinkifyEvent$Builder
```


```diff
+android/view/textclassifier/TextClassifierEvent$TextSelectionEvent
```


```diff
+android/view/textclassifier/TextClassifierEvent$TextSelectionEvent$Builder
```


```diff
+android/view/textclassifier/TextLanguage
```


```diff
+android/view/textclassifier/TextLanguage$Builder
```


```diff
+android/view/textclassifier/TextLanguage$Request
```


```diff
+android/view/textclassifier/TextLanguage$Request$Builder
```


```diff
android/view/textclassifier/TextLinks
+   STATUS_UNSUPPORTED_CHARACTER
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextLinks$Builder
+   addLink(IILMap;LBundle;)LBuilder;
+   setExtras(LBundle;)LBuilder;
```


```diff
android/view/textclassifier/TextLinks$Request
+   getCallingPackageName()LString;
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextLinks$Request$Builder
+   setExtras(LBundle;)Landroid/view/textclassifier/TextLinks$Request$Builder;
```


```diff
android/view/textclassifier/TextLinks$TextLink
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextSelection
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextSelection$Builder
+   setExtras(LBundle;)LBuilder;
```


```diff
android/view/textclassifier/TextSelection$Request
+   getCallingPackageName()LString;
+   getExtras()LBundle;
```


```diff
android/view/textclassifier/TextSelection$Request$Builder
+   setExtras(LBundle;)Landroid/view/textclassifier/TextSelection$Request$Builder;
```


```diff
android/webkit/CookieManager
-   <init>()V
```


```diff
android/webkit/CookieSyncManager
-   createInstance(LContext;)LCookieSyncManager;
-   getInstance()LCookieSyncManager;
```


```diff
android/webkit/RenderProcessGoneDetail
-   <init>()V
```


```diff
android/webkit/SafeBrowsingResponse
-   <init>()V
```


```diff
android/webkit/ServiceWorkerController
-   <init>()V
```


```diff
android/webkit/TracingController
-   <init>()V
```


```diff
android/webkit/WebIconDatabase
-   <init>()V
-   close()V
-   getInstance()LWebIconDatabase;
-   open(LString;)V
-   releaseIconForPageUrl(LString;)V
-   removeAllIcons()V
-   requestIconForPageUrl(LString;LIconListener;)V
-   retainIconForPageUrl(LString;)V
```


```diff
android/webkit/WebIconDatabase$IconListener
-   onReceivedIcon(LString;LBitmap;)V
```


```diff
android/webkit/WebSettings
+   FORCE_DARK_AUTO
+   FORCE_DARK_OFF
+   FORCE_DARK_ON
+   getForceDark()I
+   setForceDark(I)V
```


```diff
android/webkit/WebSettings$LayoutAlgorithm
-   NARROW_COLUMNS
-   SINGLE_COLUMN
```


```diff
android/webkit/WebSettings$TextSize
-   LARGER
-   LARGEST
-   NORMAL
-   SMALLER
-   SMALLEST
```


```diff
android/webkit/WebStorage$QuotaUpdater
-   updateQuota(J)V
```


```diff
android/webkit/WebView
+   getWebViewRenderProcess()LWebViewRenderProcess;
+   getWebViewRenderProcessClient()LWebViewRenderProcessClient;
+   setWebViewRenderProcessClient(LExecutor;LWebViewRenderProcessClient;)V
+   setWebViewRenderProcessClient(LWebViewRenderProcessClient;)V
```


```diff
android/webkit/WebViewClient
+   SAFE_BROWSING_THREAT_BILLING
```


```diff
android/webkit/WebViewDatabase
-   <init>()V
```


```diff
android/webkit/WebViewFragment
-   <init>()V
-   getWebView()LWebView;
```


```diff
+android/webkit/WebViewRenderProcess
```


```diff
+android/webkit/WebViewRenderProcessClient
```


```diff
android/widget/AbsListView
+   getBottomEdgeEffectColor()I
+   getTopEdgeEffectColor()I
+   isDrawSelectorOnTop()Z
+   setBottomEdgeEffectColor(I)V
+   setEdgeEffectColor(I)V
+   setTopEdgeEffectColor(I)V
```


```diff
android/widget/AbsSeekBar
+   getThumbTintBlendMode()LBlendMode;
+   getTickMarkTintBlendMode()LBlendMode;
+   setThumbTintBlendMode(LBlendMode;)V
+   setTickMarkTintBlendMode(LBlendMode;)V
```


```diff
android/widget/AbsoluteLayout
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
```


```diff
-android/widget/AbsoluteLayout$LayoutParams
-   x
-   y
-   <init>(IIII)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LLayoutParams;)V
-   debug(LString;)LString;
```


```diff
android/widget/AnalogClock
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
```


```diff
android/widget/AutoCompleteTextView
+   getInputMethodMode()I
+   refreshAutoCompleteResults()V
+   setInputMethodMode(I)V
```


```diff
android/widget/CheckedTextView
+   getCheckMarkTintBlendMode()LBlendMode;
+   setCheckMarkTintBlendMode(LBlendMode;)V
```


```diff
android/widget/CompoundButton
+   getButtonTintBlendMode()LBlendMode;
+   setButtonTintBlendMode(LBlendMode;)V
```


```diff
android/widget/DialerFilter
-   DIGITS_AND_LETTERS
-   DIGITS_AND_LETTERS_NO_DIGITS
-   DIGITS_AND_LETTERS_NO_LETTERS
-   DIGITS_ONLY
-   LETTERS_ONLY
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   append(LString;)V
-   clearText()V
-   getDigits()LCharSequence;
-   getFilterText()LCharSequence;
-   getLetters()LCharSequence;
-   getMode()I
-   isQwertyKeyboard()Z
-   onModeChange(II)V
-   removeFilterWatcher(LTextWatcher;)V
-   setDigitsWatcher(LTextWatcher;)V
-   setFilterWatcher(LTextWatcher;)V
-   setLettersWatcher(LTextWatcher;)V
-   setMode(I)V
```


```diff
android/widget/DigitalClock
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
```


```diff
android/widget/EdgeEffect
+   DEFAULT_BLEND_MODE
+   getBlendMode()LBlendMode;
+   setBlendMode(LBlendMode;)V
```


```diff
android/widget/Gallery
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   setAnimationDuration(I)V
-   setCallbackDuringFling(Z)V
-   setGravity(I)V
-   setSpacing(I)V
-   setUnselectedAlpha(F)V
```


```diff
-android/widget/Gallery$LayoutParams
-   <init>(II)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LLayoutParams;)V
```


```diff
android/widget/HorizontalScrollView
+   getLeftEdgeEffectColor()I
+   getRightEdgeEffectColor()I
+   setEdgeEffectColor(I)V
+   setLeftEdgeEffectColor(I)V
+   setRightEdgeEffectColor(I)V
```


```diff
android/widget/ImageView
+   animateTransform(LMatrix;)V
+   getImageTintBlendMode()LBlendMode;
+   setImageTintBlendMode(LBlendMode;)V
```


```diff
android/widget/ListPopupWindow
+   getEpicenterBounds()LRect;
+   setEpicenterBounds(LRect;)V
```


```diff
android/widget/Magnifier
+   SOURCE_BOUND_MAX_IN_SURFACE
+   SOURCE_BOUND_MAX_VISIBLE
-   <init>(LView;)V
+   getCornerRadius()F
+   getDefaultHorizontalSourceToMagnifierOffset()I
+   getDefaultVerticalSourceToMagnifierOffset()I
+   getElevation()F
+   getOverlay()LDrawable;
+   getPosition()LPoint;
+   getSourceHeight()I
+   getSourcePosition()LPoint;
+   getSourceWidth()I
+   isClippingEnabled()Z
+   setZoom(F)V
+   show(FFFF)V
```


```diff
+android/widget/Magnifier$Builder
```


```diff
android/widget/NumberPicker
+   getSelectionDividerHeight()I
+   getTextColor()I
+   getTextSize()F
+   setSelectionDividerHeight(I)V
+   setTextColor(I)V
+   setTextSize(F)V
```


```diff
android/widget/PopupMenu
+   setForceShowIcon(Z)V
```


```diff
android/widget/PopupWindow
+   getEpicenterBounds()LRect;
+   isClippedToScreen()Z
+   isLaidOutInScreen()Z
+   isTouchModal()Z
+   setEpicenterBounds(LRect;)V
+   setIsClippedToScreen(Z)V
+   setIsLaidOutInScreen(Z)V
+   setTouchModal(Z)V
```


```diff
android/widget/ProgressBar
+   getCurrentDrawable()LDrawable;
+   getIndeterminateTintBlendMode()LBlendMode;
+   getMaxHeight()I
+   getMaxWidth()I
+   getMinHeight()I
+   getMinWidth()I
+   getProgressBackgroundTintBlendMode()LBlendMode;
+   getProgressTintBlendMode()LBlendMode;
+   getSecondaryProgressTintBlendMode()LBlendMode;
+   setIndeterminateTintBlendMode(LBlendMode;)V
+   setMaxHeight(I)V
+   setMaxWidth(I)V
+   setMinHeight(I)V
+   setMinWidth(I)V
+   setProgressBackgroundTintBlendMode(LBlendMode;)V
+   setProgressTintBlendMode(LBlendMode;)V
+   setSecondaryProgressTintBlendMode(LBlendMode;)V
```


```diff
android/widget/RelativeLayout
+   getIgnoreGravity()I
```


```diff
android/widget/RemoteViews
+   EXTRA_SHARED_ELEMENT_BOUNDS
+   setLightBackgroundLayoutId(I)V
+   setOnClickResponse(ILRemoteResponse;)V
```


```diff
+android/widget/RemoteViews$RemoteResponse
```


```diff
android/widget/ScrollView
+   getBottomEdgeEffectColor()I
+   getTopEdgeEffectColor()I
+   scrollToDescendant(LView;)V
+   setBottomEdgeEffectColor(I)V
+   setEdgeEffectColor(I)V
+   setTopEdgeEffectColor(I)V
```


```diff
android/widget/SearchView
-   isIconfiedByDefault()Z
+   isIconifiedByDefault()Z
```


```diff
android/widget/SlidingDrawer
-   ORIENTATION_HORIZONTAL
-   ORIENTATION_VERTICAL
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   animateClose()V
-   animateOpen()V
-   animateToggle()V
-   close()V
-   getContent()LView;
-   getHandle()LView;
-   isMoving()Z
-   isOpened()Z
-   lock()V
-   open()V
-   setOnDrawerCloseListener(LOnDrawerCloseListener;)V
-   setOnDrawerOpenListener(LOnDrawerOpenListener;)V
-   setOnDrawerScrollListener(LOnDrawerScrollListener;)V
-   toggle()V
-   unlock()V
```


```diff
-android/widget/SlidingDrawer$OnDrawerCloseListener
-   onDrawerClosed()V
```


```diff
-android/widget/SlidingDrawer$OnDrawerOpenListener
-   onDrawerOpened()V
```


```diff
-android/widget/SlidingDrawer$OnDrawerScrollListener
-   onScrollEnded()V
-   onScrollStarted()V
```


```diff
android/widget/Switch
+   getThumbTintBlendMode()LBlendMode;
+   getTrackTintBlendMode()LBlendMode;
+   setThumbTintBlendMode(LBlendMode;)V
+   setTrackTintBlendMode(LBlendMode;)V
```


```diff
android/widget/TextView
+   getCompoundDrawableTintBlendMode()LBlendMode;
+   getTextCursorDrawable()LDrawable;
+   getTextDirectionHeuristic()LTextDirectionHeuristic;
+   getTextSelectHandle()LDrawable;
+   getTextSelectHandleLeft()LDrawable;
+   getTextSelectHandleRight()LDrawable;
+   isHorizontallyScrollable()Z
+   isSingleLine()Z
+   setCompoundDrawableTintBlendMode(LBlendMode;)V
+   setTextCursorDrawable(I)V
+   setTextCursorDrawable(LDrawable;)V
+   setTextSelectHandle(I)V
+   setTextSelectHandle(LDrawable;)V
+   setTextSelectHandleLeft(I)V
+   setTextSelectHandleLeft(LDrawable;)V
+   setTextSelectHandleRight(I)V
+   setTextSelectHandleRight(LDrawable;)V
```


```diff
android/widget/ToggleButton
+   getDisabledAlpha()F
```


```diff
android/widget/Toolbar
+   getCollapseContentDescription()LCharSequence;
+   getCollapseIcon()LDrawable;
+   setCollapseContentDescription(I)V
+   setCollapseContentDescription(LCharSequence;)V
+   setCollapseIcon(I)V
+   setCollapseIcon(LDrawable;)V
```


```diff
android/widget/TwoLineListItem
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   getText1()LTextView;
-   getText2()LTextView;
```


```diff
android/widget/ViewFlipper
+   getFlipInterval()I
```


```diff
android/widget/ZoomButton
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   <init>(LContext;LAttributeSet;I)V
-   <init>(LContext;LAttributeSet;II)V
-   setZoomSpeed(J)V
```


```diff
android/widget/ZoomButtonsController
-   <init>(LView;)V
-   getContainer()LViewGroup;
-   getZoomControls()LView;
-   isAutoDismissed()Z
-   isVisible()Z
-   setAutoDismissed(Z)V
-   setFocusable(Z)V
-   setOnZoomListener(LOnZoomListener;)V
-   setVisible(Z)V
-   setZoomInEnabled(Z)V
-   setZoomOutEnabled(Z)V
-   setZoomSpeed(J)V
```


```diff
-android/widget/ZoomButtonsController$OnZoomListener
-   onVisibilityChanged(Z)V
-   onZoom(Z)V
```


```diff
-android/widget/ZoomControls
-   <init>(LContext;)V
-   <init>(LContext;LAttributeSet;)V
-   hide()V
-   setIsZoomInEnabled(Z)V
-   setIsZoomOutEnabled(Z)V
-   setOnZoomInClickListener(LOnClickListener;)V
-   setOnZoomOutClickListener(LOnClickListener;)V
-   setZoomSpeed(J)V
-   show()V
```


```diff
dalvik/annotation/TestTarget
-   conceptName()LString;
-   methodArgs()[LClass;
-   methodName()LString;
```


```diff
dalvik/annotation/TestTargetClass
-   value()LClass;
```


```diff
dalvik/system/DelegateLastClassLoader
+   <init>(LString;LString;LClassLoader;Z)V
```


```diff
dalvik/system/DexFile
-   close()V
-   entries()LEnumeration;
-   getName()LString;
-   isDexOptNeeded(LString;)Z
-   loadClass(LString;LClassLoader;)LClass;
```


```diff
dalvik/system/InMemoryDexClassLoader
+   <init>([LByteBuffer;LString;LClassLoader;)V
```


```diff
java/io/LineNumberInputStream
-   <init>(LInputStream;)V
-   getLineNumber()I
-   setLineNumber(I)V
```


```diff
java/io/StringBufferInputStream
-   buffer
-   count
-   pos
-   <init>(LString;)V
```


```diff
java/lang/invoke/MethodHandleInfo
-   refKindIsField(I)Z
-   refKindIsValid(I)Z
-   refKindName(I)LString;
```


```diff
java/security/Certificate
-   decode(LInputStream;)V
-   encode(LOutputStream;)V
-   getFormat()LString;
-   getGuarantor()LPrincipal;
-   getPrincipal()LPrincipal;
-   getPublicKey()LPublicKey;
-   toString(Z)LString;
```


```diff
java/security/Identity
-   <init>()V
-   <init>(LString;)V
-   <init>(LString;LIdentityScope;)V
-   addCertificate(LCertificate;)V
-   certificates()[LCertificate;
-   getInfo()LString;
-   getPublicKey()LPublicKey;
-   getScope()LIdentityScope;
-   identityEquals(LIdentity;)Z
-   removeCertificate(LCertificate;)V
-   setInfo(LString;)V
-   setPublicKey(LPublicKey;)V
-   toString(Z)LString;
```


```diff
java/security/IdentityScope
-   <init>()V
-   <init>(LString;)V
-   <init>(LString;LIdentityScope;)V
-   addIdentity(LIdentity;)V
-   getIdentity(LPrincipal;)LIdentity;
-   getIdentity(LPublicKey;)LIdentity;
-   getIdentity(LString;)LIdentity;
-   getSystemScope()LIdentityScope;
-   identities()LEnumeration;
-   removeIdentity(LIdentity;)V
-   setSystemScope(LIdentityScope;)V
-   size()I
```


```diff
java/security/Signer
-   <init>()V
-   <init>(LString;)V
-   <init>(LString;LIdentityScope;)V
-   getPrivateKey()LPrivateKey;
-   setKeyPair(LKeyPair;)V
```


```diff
java/util/zip/InflaterInputStream
-   closed
```


```diff
javax/net/ssl/SSLEngine
+   getApplicationProtocol()LString;
+   getHandshakeApplicationProtocol()LString;
+   getHandshakeApplicationProtocolSelector()LBiFunction;
+   setHandshakeApplicationProtocolSelector(LBiFunction;)V
```


```diff
javax/net/ssl/SSLParameters
+   getApplicationProtocols()[LString;
+   setApplicationProtocols([LString;)V
```


```diff
javax/net/ssl/SSLSocket
+   getApplicationProtocol()LString;
+   getHandshakeApplicationProtocol()LString;
+   getHandshakeApplicationProtocolSelector()LBiFunction;
+   setHandshakeApplicationProtocolSelector(LBiFunction;)V
```


```diff
org/apache/http/conn/ConnectTimeoutException
-   <init>()V
-   <init>(LString;)V
```


```diff
org/apache/http/conn/scheme/HostNameResolver
-   resolve(LString;)LInetAddress;
```


```diff
org/apache/http/conn/scheme/LayeredSocketFactory
-   createSocket(LSocket;LString;IZ)LSocket;
```


```diff
org/apache/http/conn/scheme/SocketFactory
-   connectSocket(LSocket;LString;ILInetAddress;ILHttpParams;)LSocket;
-   createSocket()LSocket;
-   isSecure(LSocket;)Z
```


```diff
org/apache/http/conn/ssl/AbstractVerifier
-   <init>()V
-   acceptableCountryWildcard(LString;)Z
-   countDots(LString;)I
-   getCNs(LX509Certificate;)[LString;
-   getDNSSubjectAlts(LX509Certificate;)[LString;
-   verify(LString;[LString;[LString;Z)V
```


```diff
org/apache/http/conn/ssl/AllowAllHostnameVerifier
-   <init>()V
```


```diff
org/apache/http/conn/ssl/BrowserCompatHostnameVerifier
-   <init>()V
```


```diff
org/apache/http/conn/ssl/SSLSocketFactory
-   ALLOW_ALL_HOSTNAME_VERIFIER
-   BROWSER_COMPATIBLE_HOSTNAME_VERIFIER
-   SSL
-   SSLV2
-   STRICT_HOSTNAME_VERIFIER
-   TLS
-   <init>(LKeyStore;)V
-   <init>(LKeyStore;LString;)V
-   <init>(LKeyStore;LString;LKeyStore;)V
-   <init>(LString;LKeyStore;LString;LKeyStore;LSecureRandom;LHostNameResolver;)V
-   getHostnameVerifier()LX509HostnameVerifier;
-   getSocketFactory()LSSLSocketFactory;
-   setHostnameVerifier(LX509HostnameVerifier;)V
```


```diff
org/apache/http/conn/ssl/StrictHostnameVerifier
-   <init>()V
```


```diff
org/apache/http/conn/ssl/X509HostnameVerifier
-   verify(LString;LSSLSocket;)V
-   verify(LString;LX509Certificate;)V
-   verify(LString;[LString;[LString;)V
```


```diff
org/apache/http/params/CoreConnectionPNames
-   CONNECTION_TIMEOUT
-   MAX_HEADER_COUNT
-   MAX_LINE_LENGTH
-   SOCKET_BUFFER_SIZE
-   SO_LINGER
-   SO_TIMEOUT
-   STALE_CONNECTION_CHECK
-   TCP_NODELAY
```


```diff
org/apache/http/params/HttpConnectionParams
-   getConnectionTimeout(LHttpParams;)I
-   getLinger(LHttpParams;)I
-   getSoTimeout(LHttpParams;)I
-   getSocketBufferSize(LHttpParams;)I
-   getTcpNoDelay(LHttpParams;)Z
-   isStaleCheckingEnabled(LHttpParams;)Z
-   setConnectionTimeout(LHttpParams;I)V
-   setLinger(LHttpParams;I)V
-   setSoTimeout(LHttpParams;I)V
-   setSocketBufferSize(LHttpParams;I)V
-   setStaleCheckingEnabled(LHttpParams;Z)V
-   setTcpNoDelay(LHttpParams;Z)V
```


```diff
org/apache/http/params/HttpParams
-   copy()LHttpParams;
-   getBooleanParameter(LString;Z)Z
-   getDoubleParameter(LString;D)D
-   getIntParameter(LString;I)I
-   getLongParameter(LString;J)J
-   getParameter(LString;)LObject;
-   isParameterFalse(LString;)Z
-   isParameterTrue(LString;)Z
-   removeParameter(LString;)Z
-   setBooleanParameter(LString;Z)LHttpParams;
-   setDoubleParameter(LString;D)LHttpParams;
-   setIntParameter(LString;I)LHttpParams;
-   setLongParameter(LString;J)LHttpParams;
-   setParameter(LString;LObject;)LHttpParams;
```


```diff
org/xml/sax/AttributeList
-   getLength()I
-   getName(I)LString;
-   getType(I)LString;
-   getType(LString;)LString;
-   getValue(I)LString;
-   getValue(LString;)LString;
```


```diff
org/xml/sax/DocumentHandler
-   characters([CII)V
-   endDocument()V
-   endElement(LString;)V
-   ignorableWhitespace([CII)V
-   processingInstruction(LString;LString;)V
-   setDocumentLocator(LLocator;)V
-   startDocument()V
-   startElement(LString;LAttributeList;)V
```


```diff
org/xml/sax/HandlerBase
-   <init>()V
```


```diff
org/xml/sax/Parser
-   parse(LInputSource;)V
-   parse(LString;)V
-   setDTDHandler(LDTDHandler;)V
-   setDocumentHandler(LDocumentHandler;)V
-   setEntityResolver(LEntityResolver;)V
-   setErrorHandler(LErrorHandler;)V
-   setLocale(LLocale;)V
```


```diff
org/xml/sax/helpers/AttributeListImpl
-   <init>()V
-   <init>(LAttributeList;)V
-   addAttribute(LString;LString;LString;)V
-   clear()V
-   removeAttribute(LString;)V
-   setAttributeList(LAttributeList;)V
```


```diff
org/xml/sax/helpers/ParserFactory
-   makeParser()LParser;
-   makeParser(LString;)LParser;
```
