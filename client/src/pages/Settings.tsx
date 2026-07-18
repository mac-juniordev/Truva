import { User, Bell, Shield, Moon, Mail, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="text-gray-400 mt-2">Manage your account settings</p>
      
      <div className="mt-8 max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            Profile
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Full Name</label>
              <Input defaultValue="John Doe" className="bg-[#0a0a0a]" />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Email</label>
              <Input defaultValue="john@example.com" className="bg-[#0a0a0a]" disabled />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-emerald-400" />
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
              <div>
                <p className="text-white">Theme</p>
                <p className="text-sm text-gray-400">Dark mode is currently active</p>
              </div>
              <span className="text-emerald-400 text-sm font-medium">Dark</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive updates via email</p>
              </div>
              <span className="text-emerald-400 text-sm font-medium">Enabled</span>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
              <div>
                <p className="text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white">Change Password</p>
                <p className="text-sm text-gray-400">Update your password</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}