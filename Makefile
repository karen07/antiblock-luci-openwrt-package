# See /LICENSE for more information.
# This is free software, licensed under the GNU General Public License v2.

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI Support for antiblock
LUCI_DEPENDS:=+luci-base +antiblock

include ../../feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
