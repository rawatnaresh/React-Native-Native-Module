//
//  RCTCalendarModule.m
//  ReactNative_NativeModule
//
//  Created by Naresh Rawat on 14/04/2021.
//

#import <Foundation/Foundation.h>
#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(CalendarModule);

// Exporting a method
RCT_EXPORT_METHOD(createCalendarEvent: (NSString *)name location: (NSString *) location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

// Exporting constants
- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}

// Using callbacks
RCT_EXPORT_METHOD(createCalendarEventWithCallback: (NSString *) title
                  location: (NSString *)
                  location myCallback: (RCTResponseSenderBlock)callback)
{
  NSNumber *eventId = [NSNumber numberWithInt:123];
  callback(@[[NSNull null], eventId]);
  RCTLogInfo(@"Callback Called %@ at %@", title, location);
}


// Callback with error and success
RCT_EXPORT_METHOD(createCalendarEventWithSuccessAndErrorCallback: (NSString *) title
                  location: (NSString *) location
                  errorCallback: (RCTResponseSenderBlock)errorCallback
                  successCallback: (RCTResponseSenderBlock)successCallback)
{
  @try {
      NSNumber *eventId = [NSNumber numberWithInt:123];
      successCallback(@[eventId]);
    }

    @catch ( NSException *e ) {
      errorCallback(@[e]);
    }
}

// Method that returns promise
RCT_EXPORT_METHOD(createCalendarEventWithPromise: (NSString *) title
                  location: (NSString *) location
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
  NSNumber *eventId = [NSNumber numberWithInt:123];
 if (eventId) {
    resolve(@[eventId]);
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}

@end
