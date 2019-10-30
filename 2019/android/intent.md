## Intent

- `public Intent(Context packageContext, Class<T> activityCls)`
- `public Intent putExtra(string key, <T> val)` 
- startActivity(Context packageContext, Class activityCls)

ActivityManager

- startActivityForResult(Context packageContext, Class activityCls, int requestCode)
- setResult(int result, Intent data)
- onActivityResult(int requestCode, int resultCode, intent data)

### Activity task

when an intent started, system may create a new activity task. 
A task is a activity `stack` to store activities.

but not every intent will create a new task, or a new stack.

1. if start an intent in a task, without flag of `new task`, this activity will be added in current stack
2. if `Intent.FLAG_ACTIVITY_NEW_TASK` set, it will create a new stack
3. if activity in other app called, it still be added in current stack
4. if you want start the same app into multiple stacks, utillize `Intent.FLAG_ACTIVITY_NEW_DOCUMENT` and `Intent.FLAG_ACITIVITY_MULTIPLE_TASK` in the meanwhile

even if two activity from different apps in the same stack, they are still in **their own process**.