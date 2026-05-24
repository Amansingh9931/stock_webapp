"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Moon, Globe, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your preferences and security</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5" />
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Theme</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto (System)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Price Alerts", description: "Get notified when stock prices change" },
              { label: "Portfolio Alerts", description: "Get notified about portfolio changes" },
              { label: "News Digest", description: "Weekly financial news summary" },
              { label: "Email Notifications", description: "Receive notifications via email" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <div>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm mb-2">Change Password</p>
              <Input type="password" placeholder="Current password" className="mb-2" />
              <Input type="password" placeholder="New password" className="mb-2" />
              <Input type="password" placeholder="Confirm password" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <div>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Currency</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>USD (US Dollar)</option>
                <option>EUR (Euro)</option>
                <option>GBP (British Pound)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="pt-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
