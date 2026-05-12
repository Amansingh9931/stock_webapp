"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        {/* Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                Change Avatar
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">First Name</label>
                <Input type="text" placeholder="Aman" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Last Name</label>
                <Input type="text" placeholder="Sharma" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input type="email" placeholder="aman@gmail.com" disabled />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <Input type="tel" placeholder="+1 (555) 123-4567" />
            </div>

            <div className="pt-4 border-t">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Account Created</p>
                <p className="font-semibold">June 15, 2023</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Investments</p>
                <p className="font-semibold">$116,888.03</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Gain/Loss</p>
                <p className="font-semibold text-green-600">+$8,542.47</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <button className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950">
              Delete Account
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
